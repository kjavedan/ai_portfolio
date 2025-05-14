const checkCollision = (
  objX: number,
  objY: number,
  spriteHeight: number,
  spriteWidth: number,
  bulletPositionX: number,
  bulletPositionY: number,
  bulletSpriteWidth: number,
  bulletSpriteHeight: number,
) => {
  return !!(
    objX + spriteWidth >= bulletPositionX + 50 &&
    objX <= bulletPositionX - 50 + bulletSpriteWidth &&
    objY + spriteHeight >= bulletPositionY &&
    objY + 20 <= bulletPositionY + bulletSpriteHeight - 40
  );
};

export default checkCollision;
