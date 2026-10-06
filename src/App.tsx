/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Player,
  Bullet,
  Virus,
  Diamond,
  AmmoPickup,
  Wall,
  ChatMessage,
  WinnerRecord
} from './types/game';
import { SPLSV_QUESTIONS, SPLDV_QUESTIONS, MathQuestion } from './data/mathQuestions';
import { Lobby } from './components/Lobby';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { MobileControls } from './components/MobileControls';
import { MathQuizModal } from './components/MathQuizModal';
import { ChatOverlay } from './components/ChatOverlay';
import { LeaderboardModal } from './components/LeaderboardModal';
import { VictoryCertificate } from './components/VictoryCertificate';
import { sounds } from './utils/audio';

export default function App() {
  const [inGame, setInGame] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [myPlayerId, setMyPlayerId] = useState<string>('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Game Arena Entities
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [viruses, setViruses] = useState<Virus[]>([]);
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [ammoPickups, setAmmoPickups] = useState<AmmoPickup[]>([]);
  const [walls, setWalls] = useState<Wall[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [winners, setWinners] = useState<WinnerRecord[]>([]);

  // Modals & Overlays
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [activeQuizQuestion, setActiveQuizQuestion] = useState<{
    question: MathQuestion;
    diamondId: string;
    diamondType: 'blue' | 'red';
  } | null>(null);
  const [victoryRecord, setVictoryRecord] = useState<WinnerRecord | null>(null);
  const [nearDiamond, setNearDiamond] = useState<Diamond | null>(null);

  // Controls & States
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const inputStateRef = useRef<{ dx: number; dy: number; angle: number }>({
    dx: 0,
    dy: 0,
    angle: 0
  });

  // Track Full Screen state & Tab switch disqualification
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = Boolean(document.fullscreenElement);
      setIsFullscreen(isFs);

      // If user voluntarily exits fullscreen while in game -> Disqualify!
      if (!isFs && inGame) {
        handleDisqualification(
          'Keluar dari mode Full Screen! Anda didiskualifikasi dari pertandingan sesuai aturan.'
        );
      }
    };

    const handleVisibilityChange = () => {
      // User switched tab or minimized window -> Disqualify!
      if (document.hidden && inGame) {
        handleDisqualification(
          'Membuka tab lain atau meninggalkan layar pertandingan! Anda didiskualifikasi dari pertandingan.'
        );
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [inGame]);

  const handleDisqualification = (reason: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'disqualify' }));
    }
    sounds.playWarning();
    setInGame(false);
    setErrorNotice(reason);
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Join Room & WebSocket connection
  const handleJoinRoom = async (name: string, avatar: string, color: string) => {
    setIsConnecting(true);
    setErrorNotice(null);

    // Request full screen automatically per user requirement:
    // "Otomatis jika bermain full screen jika keluar atau bukan tab lain didiskualifikasi"
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(() => {
          // In some browsers full screen requires immediate user gesture
        });
      }
    } catch {
      // ignore
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'join',
          name,
          avatar,
          color
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'joined') {
          setMyPlayerId(data.playerId);
          setWalls(data.walls || []);
          if (data.winners) setWinners(data.winners);
          setIsConnecting(false);
          setInGame(true);
        } else if (data.type === 'gameState') {
          setPlayers(data.state.players || {});
          setViruses(data.state.viruses || []);
          setBullets(data.state.bullets || []);
          setAmmoPickups(data.state.ammoPickups || []);
          setDiamonds(data.state.diamonds || []);
          if (data.state.winners) setWinners(data.state.winners);
        } else if (data.type === 'chatMessage') {
          setChatMessages((prev) => [...prev.slice(-49), data.message]);
        } else if (data.type === 'playerJoinedNotification') {
          // Play subtle chime when a player joins
          sounds.playAmmoPickup();
        } else if (data.type === 'ammoCollected') {
          sounds.playAmmoPickup();
        } else if (data.type === 'playerHit') {
          sounds.playHit();
        } else if (data.type === 'awardScore') {
          sounds.playVirusDefeat();
        } else if (data.type === 'victoryCertificate') {
          setVictoryRecord(data.winner);
          sounds.playVictory();
        } else if (data.type === 'gameOver') {
          setInGame(false);
          setErrorNotice(data.reason || 'Pertandingan selesai. Nyawa Anda habis!');
          sounds.playWarning();
        } else if (data.type === 'disqualified') {
          setInGame(false);
          setErrorNotice(data.reason);
          sounds.playWarning();
        } else if (data.type === 'kicked') {
          setInGame(false);
          setErrorNotice(data.reason);
          sounds.playWarning();
        } else if (data.type === 'roomFull') {
          setIsConnecting(false);
          setErrorNotice('Room saat ini penuh (30 pemain). Silakan coba lagi beberapa saat lagi.');
        }
      } catch {
        // parse error
      }
    };

    ws.onclose = () => {
      setIsConnecting(false);
    };

    ws.onerror = () => {
      setIsConnecting(false);
      setErrorNotice('Gagal terhubung ke server game room. Pastikan server aktif.');
    };
  };

  // Send movement/aim inputs periodically to server
  const sendInput = useCallback((dx: number, dy: number, angle: number, shoot?: boolean) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'input',
          dx,
          dy,
          angle,
          shoot: Boolean(shoot)
        })
      );
    }
  }, []);

  const handleShoot = () => {
    sounds.playShoot();
    const { dx, dy, angle } = inputStateRef.current;
    sendInput(dx, dy, angle, true);
  };

  const handleAim = (angle: number) => {
    inputStateRef.current.angle = angle;
    const { dx, dy } = inputStateRef.current;
    sendInput(dx, dy, angle, false);
  };

  const handleMove = (dx: number, dy: number) => {
    inputStateRef.current.dx = dx;
    inputStateRef.current.dy = dy;
    const { angle } = inputStateRef.current;
    sendInput(dx, dy, angle, false);
  };

  // Open math question when interacting with a diamond
  const handleOpenDiamondQuiz = () => {
    if (!nearDiamond) return;
    const isBlue = nearDiamond.type === 'blue';
    const qList = isBlue ? SPLSV_QUESTIONS : SPLDV_QUESTIONS;
    const q = qList.find((item) => item.id === nearDiamond.questionId) || qList[0];

    sounds.playDiamondChime();
    setActiveQuizQuestion({
      question: q,
      diamondId: nearDiamond.id,
      diamondType: nearDiamond.type
    });
  };

  // Answer submitted to server
  const handleAnswerQuestion = (diamondId: string, diamondType: 'blue' | 'red', optionIndex: number) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'answerQuestion',
          diamondId,
          diamondType,
          selectedOptionIndex: optionIndex
        })
      );
    }
  };

  // Send global chat
  const handleSendMessage = (text: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'chat',
          text
        })
      );
    }
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sounds.enabled = nextState;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const myPlayer = players[myPlayerId];
  const totalPlayersCount = Object.keys(players).length;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans">
      {!inGame || !myPlayer ? (
        <Lobby
          onJoin={handleJoinRoom}
          winners={winners}
          isConnecting={isConnecting}
          errorNotice={errorNotice}
        />
      ) : (
        <>
          {/* Main 2D Canvas Engine */}
          <GameCanvas
            myPlayerId={myPlayerId}
            players={players}
            bullets={bullets}
            viruses={viruses}
            diamonds={diamonds}
            ammoPickups={ammoPickups}
            walls={walls}
            onShoot={handleShoot}
            onAim={handleAim}
            onMoveKeys={handleMove}
            onCheckNearDiamond={setNearDiamond}
            onInteractDiamond={handleOpenDiamondQuiz}
          />

          {/* Top Heads-Up Display (HUD) */}
          <HUD
            player={myPlayer}
            totalPlayers={totalPlayersCount}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            onOpenLeaderboard={() => setShowLeaderboard(true)}
            onOpenCertificate={() => victoryRecord && setVictoryRecord(victoryRecord)}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
            nearDiamondType={nearDiamond?.type || null}
            onInteractDiamond={handleOpenDiamondQuiz}
          />

          {/* Cross-Platform Mobile Controls (Touch Joystick & Fire button) */}
          <MobileControls
            onMove={handleMove}
            onShoot={handleShoot}
            onAim={handleAim}
            nearDiamondType={nearDiamond?.type || null}
            onInteractDiamond={handleOpenDiamondQuiz}
          />

          {/* Global Bottom Chat Overlay */}
          <ChatOverlay
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            myPlayerId={myPlayerId}
          />

          {/* Math Quiz Modal (SPLSV 100 questions / SPLDV 50 questions) */}
          {activeQuizQuestion && (
            <MathQuizModal
              question={activeQuizQuestion.question}
              diamondId={activeQuizQuestion.diamondId}
              diamondType={activeQuizQuestion.diamondType}
              onAnswer={handleAnswerQuestion}
              onClose={() => setActiveQuizQuestion(null)}
            />
          )}

          {/* Real-time Leaderboard & Hall of Fame Modal */}
          {showLeaderboard && (
            <LeaderboardModal
              players={players}
              winners={winners}
              myPlayerId={myPlayerId}
              onClose={() => setShowLeaderboard(false)}
            />
          )}

          {/* Official Victory Certificate of Achievement */}
          {victoryRecord && (
            <VictoryCertificate
              winner={victoryRecord}
              onClose={() => setVictoryRecord(null)}
              onReturnToLobby={() => {
                setVictoryRecord(null);
                setInGame(false);
                if (socketRef.current) socketRef.current.close();
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
