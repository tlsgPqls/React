"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./worldcup.module.css";

interface WorldcupGame {
  id: number;
  title: string;
  desc: string;
  views: number;
  _count: { items: number };
}

interface WorldcupItem {
  id: number;
  name: string;
  imageUrl: string;
  winCount: number;
  matchCount: number;
  winRate?: number; // 우승 확률
  matchWinRate?: number; // 대결 승률
}
interface StatsData {
  title: string;
  totalPlays: number;
  rankings: WorldcupItem[];
}
export default function WorldcupPage() {
  const [gameList, setGameList] = useState<WorldcupGame[]>([]); // 전체 월드컵 목록
  const [selectedGame, setSelectedGame] = useState<WorldcupGame | null>(null); // 선택된 월드컵 주제
  const [chosenRound, setChosenRound] = useState<number>(0); // 유저가 선택한 강수 (8, 16, 32)

  const [roundItems, setRoundItems] = useState<WorldcupItem[]>([]);
  const [nextRoundItems, setNextRoundItems] = useState<WorldcupItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winner, setWinner] = useState<WorldcupItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);

  // 💬 댓글 목록을 담을 프론트 상태값 컴포넌트 상단(State 구역)에 함께 추가해 두세요!
  const [comments, setComments] = useState<any[]>([]);
  const [nickname, setNickname] = useState("");
  const [commentContent, setCommentContent] = useState("");

  // 1. 첫 진입 시 등록된 모든 월드컵 리스트 가져오기
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:3001/worldcup");
        if (response.ok) {
          const data = await response.json();
          setGameList(data);
        }
      } catch (error) {
        console.error("목록 로드 실패", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchList();
  }, []);

  // 2. 강수를 선택하고 [게임 시작]을 눌렀을 때 백엔드 데이터 요청
  const handleStartGame = async (gameId: number, round: number) => {
    setIsLoading(true);
    try {
      // 쿼리스트링으로 선택한 강수(?round=16)를 실어서 요청합니다.
      const response = await fetch(
        `http://localhost:3001/worldcup/${gameId}?round=${round}`,
      );
      if (response.ok) {
        const data = await response.json();
        setRoundItems(data.items);
        setChosenRound(round); // 게임 시작 확정
      }
    } catch (error) {
      console.error("게임 데이터 로드 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = async (selected: WorldcupItem) => {
    const nextRound = [...nextRoundItems, selected];

    if (currentIndex + 2 >= roundItems.length) {
      if (nextRound.length === 1) {
        setWinner(selected);
        try {
          await fetch(
            `http://localhost:3001/worldcup/item/${selected.id}/win`,
            { method: "PATCH" },
          );
        } catch (error) {
          console.error("기록 실패:", error);
        }
      } else {
        setRoundItems(nextRound);
        setNextRoundItems([]);
        setCurrentIndex(0);
      }
    } else {
      setNextRoundItems(nextRound);
      setCurrentIndex((prev) => prev + 2);
    }
  };

  //통계가져오기 함수
  // src/app/worldcup/page.tsx 내의 loadStats 함수 수정

  // 📊 통계 데이터와 댓글 함께 호출하도록 기존 loadStats 함수 수정 보완
  const loadStats = async () => {
    if (!selectedGame) return;
    setIsLoading(true);
    try {
      // 1. 통계 조회
      const resStats = await fetch(
        `http://localhost:3001/worldcup/${selectedGame.id}/stats`,
      );
      // 2. 댓글 조회
      const resComments = await fetch(
        `http://localhost:3001/worldcup/${selectedGame.id}/comments`,
      );

      if (resStats.ok && resComments.ok) {
        const dataStats = await resStats.json();
        const dataComments = await resComments.json();
        setStats(dataStats);
        setComments(dataComments); // 댓글 적재
        setShowStats(true);
      }
    } catch (error) {
      console.error("통계 및 댓글 로드 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 💬 댓글 등록 핸들러 함수 추가
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame || !nickname.trim() || !commentContent.trim()) {
      alert("닉네임과 내용을 모두 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/worldcup/${selectedGame.id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nickname, content: commentContent }),
        },
      );

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]); // 최신 댓글 배열 맨 앞에 즉시 누적
        setCommentContent(""); // 입력창 청소
      }
    } catch (error) {
      console.error("댓글 등록 실패", error);
    }
  };

  if (isLoading)
    return (
      <div className={style.loading}>⚡ 데이터를 불러오는 중입니다...</div>
    );

  if (isLoading)
    return (
      <div className={style.loading}>⚡ 데이터를 불러오는 중입니다...</div>
    );

  // ----------------------------------------------------
  // STEP 1: 어떤 월드컵을 할지 주제 고르는 메인화면 리스트
  // ----------------------------------------------------
  if (!selectedGame) {
    return (
      <div className={style.container}>
        <h1 className={style.winnerText}>🏆 애니대백과 이상형 월드컵 🏆</h1>
        <p className={style.progress} style={{ marginBottom: "30px" }}>
          다양한 주제의 월드컵에 도전해 보세요!
        </p>
        <button
          onClick={() => router.push("/worldcup/create")}
          className={style.retryBtn}
          style={{
            background: "#ff4757",
            maxWidth: "240px",
            marginBottom: "40px",
            marginTop: "10px",
          }}
        >
          🛠️ 나만의 월드컵 만들기
        </button>
        <div className={style.statsList} style={{ maxWidth: "800px" }}>
          {gameList.map((game) => (
            <div
              key={game.id}
              className={style.statsRow}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedGame(game)}
            >
              <span className={style.rankNumber} style={{ fontSize: "1.6rem" }}>
                🎮
              </span>
              <div className={style.statsInfo}>
                <span className={style.statsName}>{game.title}</span>
                <span style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                  {game.desc || "설명이 없습니다."}
                </span>
              </div>
              <div
                style={{
                  textAlign: "right",
                  fontSize: "0.85rem",
                  color: "#95a5a6",
                }}
              >
                <div>
                  플레이: <strong>{game.views}</strong>회
                </div>
                <div>
                  등록 후보: <strong>{game._count.items}</strong>명
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // STEP 2: 주제 선택 후, 강수(8강/16강/32강) 고르는 대기실
  // ----------------------------------------------------
  if (selectedGame && chosenRound === 0) {
    const totalItems = selectedGame._count.items;
    return (
      <div className={style.container}>
        <h1 className={style.winnerText}>{selectedGame.title}</h1>
        <p className={style.progress}>{selectedGame.desc}</p>

        <div className={style.lobbyBox}>
          <h3>대결 강수(라운드)를 선택해 주세요</h3>
          <div className={style.roundButtonGroup}>
            {totalItems >= 8 && (
              <button onClick={() => handleStartGame(selectedGame.id, 8)}>
                8강 시작
              </button>
            )}
            {totalItems >= 16 && (
              <button onClick={() => handleStartGame(selectedGame.id, 16)}>
                16강 시작
              </button>
            )}
            {totalItems >= 32 && (
              <button onClick={() => handleStartGame(selectedGame.id, 32)}>
                32강 시작
              </button>
            )}
          </div>
          <p
            style={{ fontSize: "0.85rem", color: "#e74c3c", marginTop: "15px" }}
          >
            * 후보가 총 {totalItems}명 등록되어 있어 참여 가능한 라운드만
            활성화됩니다.
          </p>
          <button
            onClick={() => setSelectedGame(null)}
            className={style.retryBtn}
            style={{ background: "#7f8c8d", marginTop: "30px" }}
          >
            ⬅️ 다른 월드컵 고르기
          </button>
        </div>
      </div>
    );
  }
  if (showStats && stats) {
    return (
      <div
        className={style.container}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <h1 className={style.winnerText}>📊 {stats.title} 결과 통계 광장</h1>
        <p className={style.progress} style={{ marginBottom: "30px" }}>
          총 플레이 횟수: {stats.totalPlays}회
        </p>

        {/* 💥 핵심: 좌우 분할 레이아웃 배치 */}
        <div className={style.statsFlexContainer}>
          {/* [왼쪽 영역]: 순위표 */}
          <div className={style.statsLeftSection}>
            <h2 className={style.sectionSubTitle}>🏆 캐릭터 순위표</h2>
            <div className={style.statsList}>
              {stats.rankings.map((character: WorldcupItem, index: number) => (
                <div key={character.id} className={style.statsRow}>
                  <span className={style.rankNumber}>{index + 1}위</span>
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className={style.statsThumb}
                  />
                  <div className={style.statsInfo}>
                    <span className={style.statsName}>{character.name}</span>
                    <div className={style.statsDataGroup}>
                      <span>
                        우승확률: <strong>{character.winRate}%</strong>
                      </span>
                      <span>
                        대결승률: <strong>{character.matchWinRate}%</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* [오른쪽 영역]: 코멘트 피드방 */}
          <div className={style.statsRightSection}>
            <h2 className={style.sectionSubTitle}>
              💬 주술사들의 한줄평 방명록
            </h2>

            {/* 댓글 작성 폼 */}
            <form onSubmit={handleCommentSubmit} className={style.commentForm}>
              <input
                type="text"
                placeholder="닉네임"
                className={style.commentInputNickname}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                <input
                  type="text"
                  placeholder="최애캐에 대해 한마디 남겨보세요!"
                  className={style.commentInputContent}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <button type="submit" className={style.commentSubmitBtn}>
                  등록
                </button>
              </div>
            </form>

            {/* 댓글 피드 리스트 */}
            <div className={style.commentFeedList}>
              {comments.length === 0 ? (
                <p className={style.noComments}>
                  첫 코멘트의 주인공이 되어보세요! ✍️
                </p>
              ) : (
                comments.map((comment: any) => (
                  <div key={comment.id} className={style.commentBubble}>
                    <div className={style.commentHeader}>
                      <span className={style.commentUser}>
                        {comment.nickname}
                      </span>
                      <span className={style.commentDate}>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={style.commentText}>{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className={style.retryBtn}
          style={{ maxWidth: "300px", marginTop: "40px" }}
        >
          🏠 다른 월드컵 고르기 (처음으로)
        </button>
      </div>
    );
  }

  // ----------------------------------------------------
  // STEP 3: 최종 우승자 화면 출력
  // ----------------------------------------------------
  if (winner) {
    return (
      <div className={style.container}>
        <h1 className={style.winnerText}>🏆 최종 우승자 탄생 🏆</h1>
        <div className={style.winnerCard}>
          <div className={style.imageWrapper} style={{ height: "350px" }}>
            <img
              src={winner.imageUrl}
              alt={winner.name}
              className={style.image}
            />
          </div>
          <div className={style.winnerNameTag}>{winner.name}</div>
          <button
            onClick={() => window.location.reload()}
            className={style.retryBtn}
          >
            🎮 처음화면으로 가기
          </button>
          <button
            onClick={loadStats}
            className={style.retryBtn}
            style={{ background: "#ff4757" }}
          >
            📊 결과 통계 보기
          </button>
          <button
            onClick={() => window.location.reload()}
            className={style.retryBtn}
          >
            🔄 다시하기
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // STEP 4: 본격 토너먼트 배틀 진행 화면
  // ----------------------------------------------------
  const leftItem = roundItems[currentIndex];
  const rightItem = roundItems[currentIndex + 1];

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        {selectedGame.title}
        <span className={style.badge}>
          {roundItems.length === 2 ? "🥇 결승전 🥇" : `${roundItems.length}강`}
        </span>
        <span className={style.progress}>
          매치: {Math.floor(currentIndex / 2) + 1} / {roundItems.length / 2}
        </span>
      </h1>

      <div className={style.matchZone}>
        {leftItem && (
          <div className={style.card} onClick={() => handleSelect(leftItem)}>
            <div className={style.imageWrapper}>
              <img
                src={leftItem.imageUrl}
                alt={leftItem.name}
                className={style.image}
              />
            </div>
            <div className={style.nameTag}>{leftItem.name}</div>
          </div>
        )}
        <div className={style.vs}>VS</div>
        {rightItem && (
          <div className={style.card} onClick={() => handleSelect(rightItem)}>
            <div className={style.imageWrapper}>
              <img
                src={rightItem.imageUrl}
                alt={rightItem.name}
                className={style.image}
              />
            </div>
            <div className={style.nameTag}>{rightItem.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}
