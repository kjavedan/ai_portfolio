'use client';
import Image from 'next/image';
import { useSound } from 'use-sound';
import shootIcon from '@/assets/fire.png';
import pauseIcon from '@/assets/pause.png';
import levelBg from '@/assets/level-bg.png';
import bulletSrc from '@/assets/bullet.png';
import reloadIcon from '@/assets/reload.png';
import levelWorior from '@/assets/woriors.png';
import playIcon from '@/assets/play-button.png';
import explosionSrc from '@/assets/explosion.png';
import { useEffect, useRef, useState } from 'react';
import levelTarget from '@/assets/level-targets.png';
import checkCollision from '@/lib/collision-detection';

export default function GameField({
  levelNumber = 3,
  woriorSpriteFrame,
  woriorSpriteWidth,
  woriorSpriteHeight,
}: {
  levelNumber: number;
  woriorSpriteFrame: number;
  woriorSpriteWidth: number;
  woriorSpriteHeight: number;
}) {
  //VARIABLES
  const BULLET_SPEED = 10;

  const ROUND_TIME = 60;

  const collisionSpriteWidth = 200;
  const collisionSpriteHeight = 179;

  const spriteWidth = 100;
  const spriteHeight = 90;

  const bulletSpriteWidth = 40.44;
  const bulletSpriteHeight = 55.33;

  const spriteSizeH = 77.6;
  const spriteSizeW = 123.8;
  const targetsSpriteFrame = 17;

  // const screenWidth = window.innerWidth >= 900 ? 900 : window.innerWidth;
  const screenHeight = 400;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetsRef = useRef<HTMLImageElement | null>(null);
  const woriorRef = useRef<HTMLImageElement | null>(null);
  const bulletRef = useRef<HTMLImageElement | null>(null);
  const explosionRef = useRef<HTMLImageElement | null>(null);

  //SOUNDS
  const [playShootingSound] = useSound('/sounds/shootFx.wav');
  const [playCollisionSound] = useSound('/sounds/gruntFx.wav');
  const [playWoriorOneGrunt] = useSound('/sounds/worior1grunt.wav');
  const [playWoriorTwoGrunt] = useSound('/sounds/worior2grunt.wav');
  const [playGameToggleSound] = useSound('/sounds/backSound.wav');

  //CANVAS CONTEXT
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  //STATES
  const [screenWidth, setScreenWidth] = useState(0);
  const [spriteFrame, setSpriteFrame] = useState(0);
  const [woriorOneSpriteFrame, setworiorOneSpriteFrame] =
    useState(woriorSpriteFrame);
  const [woriorTwoSpriteFrame, setworiorTwoSpriteFrame] = useState(0);

  const [image, setImage] = useState<CanvasImageSource | null>(null);
  const [woriorImage, setWoriorImage] = useState<HTMLImageElement | null>(null);
  const [explosionImg, setExplosionImg] = useState<HTMLImageElement | null>(
    null,
  );
  const [bulletImg, setBulletImg] = useState<HTMLImageElement | null>(null);
  const [bulletSpriteFrame, setBulletSpriteFrame] = useState(0);
  const [bulletPositionY, setBulletPostionY] = useState(320);
  const [bulletPositionX, setBulletPostionX] = useState(
    screenWidth / 2 - bulletSpriteWidth - 20,
  );

  const [objX, setObjX] = useState(-spriteWidth);
  const [objY] = useState(45);

  const [objX1, setObjX1] = useState(screenWidth + spriteWidth);
  const [objY1] = useState(70);

  const [objX2, setObjX2] = useState(-screenWidth);
  const [objY2] = useState(150);

  const [gameStatus, setGameStatus] = useState(false);
  const [startPlay, setStartPlay] = useState(false);
  const [shooting, setShooting] = useState(false);
  const [isCollied, setIsCollied] = useState(false);
  const [collisionInfo, setCollisionInfo] = useState({
    collisionX: 0,
    collisionY: 0,
  });
  const [collisionSpriteFrame, setCollisionSpriteFrame] = useState(0);
  const [levelScore, setlevelScore] = useState(0);

  // Add these new state variables after the existing state declarations
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Add these constants for different enemy scores
  const ENEMY_SCORES = {
    top: 10, // Top enemy (objX) gets highest score
    middle: 5, // Middle enemy (objX1) gets medium score
    bottom: 2, // Bottom enemy (objX2) gets lowest score
  };

  //FUNCTIONS
  const animate = () => {
    if (ctx && startPlay && image && woriorImage) {
      ctx.clearRect(0, 0, screenWidth, 400);

      // targets animation
      ctx.drawImage(
        image,
        spriteFrame * spriteSizeW,
        0,
        spriteSizeW,
        spriteSizeH,
        objX,
        objY,
        spriteWidth + 20,
        spriteHeight,
      );
      // worior 1 animation
      ctx.drawImage(
        woriorImage,
        woriorOneSpriteFrame * woriorSpriteWidth,
        0,
        woriorSpriteWidth,
        woriorSpriteHeight,
        objX1,
        objY1,
        spriteWidth,
        spriteHeight + 20,
      );

      // worior 2 animation
      if (levelNumber === 3) {
        ctx.drawImage(
          woriorImage,
          woriorTwoSpriteFrame * woriorSpriteWidth,
          141,
          woriorSpriteWidth,
          woriorSpriteHeight,
          objX2,
          objY2,
          spriteWidth,
          spriteHeight + 20,
        );
      }

      // collision animation
      if (isCollied && explosionImg) {
        ctx.drawImage(
          explosionImg,
          spriteWidth * collisionSpriteFrame,
          0,
          collisionSpriteWidth,
          collisionSpriteHeight,
          collisionInfo.collisionX + 15,
          collisionInfo.collisionY + 15,
          collisionSpriteWidth / 3,
          collisionSpriteHeight / 3,
        );
      }

      // bullet animation
      if (bulletImg) {
        ctx.drawImage(
          bulletImg,
          182 * bulletSpriteFrame,
          0,
          182,
          249,
          bulletPositionX,
          bulletPositionY,
          bulletSpriteWidth,
          bulletSpriteHeight,
        );
      }
    }
  };

  if (gameStatus && startPlay) {
    animate();
  }

  const startShooting = () => {
    if (gameStatus && !shooting) {
      setShooting(true);
      playShootingSound();
    }
  };

  const handlePlay = () => {
    if (gameOver) {
      // Reset game state
      setGameOver(false);
      setTimeLeft(ROUND_TIME);
      setlevelScore(0);
      setFinalScore(0);
      setObjX(-spriteWidth);
      setObjX1(screenWidth + spriteWidth);
      setObjX2(-screenWidth);
    }
    setGameStatus(!gameStatus);
    setStartPlay(!startPlay);
    playGameToggleSound();
  };

  // useEffect (1) getting and settting the canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = screenWidth;
      canvas.height = screenHeight;
      setImage(targetsRef.current);
      setWoriorImage(woriorRef.current);
      setExplosionImg(explosionRef.current);
      const bulletImage = bulletRef.current;
      setCtx(canvas.getContext('2d'));
      setBulletImg(bulletImage);
    }
  }, [ctx, canvasRef, image]);

  //useEffect (2) controlling the bullet position
  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    if (gameStatus && shooting) {
      if (bulletPositionY > -bulletSpriteHeight) {
        timeId = setInterval(() => {
          setBulletPostionY(
            (bulletPositionY) => bulletPositionY - BULLET_SPEED,
          );
        }, 40);
      } else {
        setShooting(false);
        setBulletPostionY(320);
      }
    }

    return () => {
      clearInterval(timeId);
    };
  }, [gameStatus, shooting, bulletPositionY]);

  //useEffect (6) bullet animation
  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    if (gameStatus && bulletSpriteFrame < 14) {
      timeId = setInterval(() => {
        setBulletSpriteFrame((PS) => PS + 1);
      }, 70);
    }

    if (bulletSpriteFrame >= 13) setBulletSpriteFrame(0);

    return () => {
      clearInterval(timeId);
    };
  }, [gameStatus, bulletSpriteFrame]);

  //useEffect 9 setting the X corrdination of the objX
  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;

    if (gameStatus && objX <= screenWidth) {
      timeId = setInterval(() => {
        setObjX((objX) => objX + 5);
        if (levelNumber >= 2 && objX1 >= -woriorSpriteWidth) {
          setObjX1((objX1) => objX1 - 4);
        }
        if (levelNumber >= 3 && objX2 <= screenWidth) {
          setObjX2((objX2) => objX2 + 15);
        }
      }, 40);
    }

    // switching targets 1 frames
    if (spriteFrame >= targetsSpriteFrame) setSpriteFrame(0);
    setSpriteFrame((PS) => PS + 1);

    if (objX > screenWidth) setObjX(-spriteSizeW);

    //level 2 target frams
    if (!(objX1 >= -woriorSpriteWidth)) {
      setObjX1(screenWidth + woriorSpriteWidth);
    }
    if (woriorOneSpriteFrame <= 0) {
      setworiorOneSpriteFrame(woriorSpriteFrame);
    } else {
      setworiorOneSpriteFrame((prevFrame) => prevFrame - 1);
    }

    //level 3 target frams
    if (objX2 > screenWidth) {
      setObjX2(-woriorSpriteWidth);
    }
    if (woriorTwoSpriteFrame < woriorSpriteFrame) {
      setworiorTwoSpriteFrame((prevFrame) => prevFrame + 1);
    } else {
      setworiorTwoSpriteFrame(0);
    }

    return () => {
      clearInterval(timeId);
    };
  }, [gameStatus, startPlay, objX]);

  // useEffect (4) collision detection
  useEffect(() => {
    if (gameStatus && shooting) {
      if (
        checkCollision(
          objX,
          objY,
          spriteHeight,
          spriteWidth,
          bulletPositionX,
          bulletPositionY,
          bulletSpriteWidth,
          bulletSpriteHeight,
        )
      ) {
        setShooting(false);
        setBulletPostionY(320);
        setObjX(-spriteWidth);
        setlevelScore((score) => score + ENEMY_SCORES.top);
        setIsCollied(true);
        setCollisionInfo({ collisionX: objX, collisionY: objY });
        playCollisionSound();
      }
      if (
        levelNumber >= 2 &&
        checkCollision(
          objX1,
          objY1,
          spriteHeight,
          spriteWidth,
          bulletPositionX,
          bulletPositionY,
          bulletSpriteWidth,
          bulletSpriteHeight,
        )
      ) {
        setShooting(false);
        setBulletPostionY(320);
        setObjX1(screenWidth + spriteWidth);
        setlevelScore((score) => score + ENEMY_SCORES.middle);
        setIsCollied(true);
        setCollisionInfo({ collisionX: objX1, collisionY: objY1 });
        playWoriorOneGrunt();
      }
      if (
        levelNumber >= 3 &&
        checkCollision(
          objX2,
          objY2,
          spriteHeight,
          spriteWidth,
          bulletPositionX,
          bulletPositionY,
          bulletSpriteWidth,
          bulletSpriteHeight,
        )
      ) {
        setShooting(false);
        setBulletPostionY(320);
        setObjX2(-spriteWidth);
        setlevelScore((score) => score + ENEMY_SCORES.bottom);
        setIsCollied(true);
        setCollisionInfo({ collisionX: objX2, collisionY: objY2 });
        playWoriorTwoGrunt();
      }
    }
  }, [
    gameStatus,
    shooting,
    bulletPositionY,
    levelScore,
    bulletPositionX,
    bulletSpriteWidth,
    objX,
    objY,
    spriteHeight,
    spriteWidth,
  ]);

  // console.log(screenWidth);

  //useEffect (5) collision sprite frame switching
  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    if (isCollied && collisionSpriteFrame < 4) {
      timeId = setInterval(() => {
        setCollisionSpriteFrame((PS) => PS + 1);
      }, 18);

      setTimeout(() => {
        setCollisionSpriteFrame(0);
        setIsCollied(false);
      }, 100);

      return () => {
        clearInterval(timeId);
      };
    }
  }, [
    isCollied,
    collisionSpriteFrame,
    bulletPositionX,
    bulletSpriteWidth,
    objX,
    objY,
    collisionInfo.collisionX,
    collisionInfo.collisionY,
    ctx,
    explosionImg,
    spriteWidth,
  ]);

  //listining to screen resizing
  useEffect(() => {
    const updateWindowDimensions = () => {
      const width = window.innerWidth >= 900 ? 900 : window.innerWidth;
      setScreenWidth(width);
      setBulletPostionX(screenWidth / 2 - bulletSpriteWidth + 20);
    };
    setBulletPostionX(screenWidth / 2 - bulletSpriteWidth + 20);

    // Add event listener to update dimensions on window resize
    window.addEventListener('resize', updateWindowDimensions);

    // Initial call to set dimensions
    updateWindowDimensions();
    console.log('hi');
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, [ctx, screenWidth]);

  // Add new useEffect for timer
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;

    if (gameStatus && timeLeft > 0 && !gameOver) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Game over
            setGameOver(true);
            setGameStatus(false);
            setStartPlay(false);
            setFinalScore(levelScore);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [gameStatus, timeLeft, gameOver]);

  return (
    <div className="flex size-full flex-col">
      {/* Timer display */}
      <div className="flex items-center justify-end gap-2 pr-2 font-mono text-lg">
        <p>Score: {levelScore}</p> -<p>Time: {timeLeft}s</p>
      </div>
      <div className="relative mt-4 flex-1 lg:flex-none">
        <Image
          src={levelBg}
          priority={true}
          alt="level background"
          className="lg:auto absolute top-0 left-0 -z-10 h-[300px] w-full lg:h-[450]"
        />
        <canvas ref={canvasRef} className="h-[400px] w-full lg:h-[450px]">
          {/* targets image */}
          <Image
            ref={targetsRef}
            src={levelTarget}
            loading="eager"
            alt=""
            style={{ display: 'none' }}
          />
          {/* worior image */}
          <Image
            ref={woriorRef}
            src={levelWorior}
            loading="eager"
            alt=""
            style={{ display: 'none' }}
          />
          {/* bullet image */}
          <Image
            ref={bulletRef}
            src={bulletSrc}
            alt=""
            loading="eager"
            style={{ display: 'none' }}
          />
          {/* explosion image */}
          <Image
            ref={explosionRef}
            src={explosionSrc}
            alt=""
            loading="eager"
            style={{ display: 'none' }}
          />
        </canvas>

        {/* Game over screen */}
        {gameOver && (
          <div className="fixed inset-0 flex size-full flex-col items-center justify-center bg-black/70">
            <div className="rounded-lgp-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Game Over!</h2>
              <p className="mb-4 font-mono text-xl">
                Final Score: {finalScore}
              </p>
              <div
                onClick={handlePlay}
                className="flex flex-col items-center gap-2"
              >
                <Image width={70} src={reloadIcon} alt="reaload icon" />
                <span className="text-xs">Play Again</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-around pb-30 lg:h-40 lg:pb-0">
        <button onClick={handlePlay} className="cursor-pointer">
          {gameStatus ? (
            <div>
              <Image
                width={70}
                src={pauseIcon}
                loading="eager"
                alt="shoot btn"
              />
            </div>
          ) : (
            <div>
              <Image
                width={70}
                src={playIcon}
                loading="eager"
                alt="shoot btn"
              />
            </div>
          )}
        </button>
        <button
          onClick={startShooting}
          className="cursor-pointer transition-transform active:scale-90"
        >
          <Image width={80} src={shootIcon} loading="eager" alt="shoot btn" />
        </button>
      </div>
    </div>
  );
}
