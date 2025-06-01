import { Scene } from 'phaser';

export class IntroScene extends Scene {
    private currentTextIndex: number = 0;
    private storyTexts: string[] = [
        'MARS EXPEDITION',
        '',
        "Humanity's greatest adventure begins...",
        '',
        'You are the commander of the first Mars',
        'colonization mission.',
        '',
        'Your ship has landed on the red planet,',
        'but your crew is still in cryosleep.',
        '',
        'Before you can wake them up, you need',
        'to gather essential resources.',
        '',
        'Collect at least 10,000 gems to power',
        'the life support systems.',
        '',
        'The future of humanity depends on you.',
        '',
        'Click anywhere to begin your mission...',
    ];
    private displayedTexts: Phaser.GameObjects.Text[] = [];

    constructor() {
        super('IntroScene');
    }

    create() {
        const { width, height } = this.scale;

        // Add Mars background
        this.add.image(0, 0, 'gameBackground').setOrigin(0).setDisplaySize(width, height);

        // Add dark overlay for better text readability
        this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);

        // Add stars effect
        this.createStarsEffect();

        // Start text animation
        this.time.delayedCall(1000, () => {
            this.animateText();
        });

        // Add click to continue
        this.input.once('pointerdown', () => {
            this.scene.start('MainGame');
        });

        // Add skip button
        const skipButton = this.add
            .text(width - 100, 50, 'SKIP', {
                fontSize: '20px',
                color: '#ff6b6b',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 },
            })
            .setOrigin(1, 0)
            .setInteractive({ useHandCursor: true });

        skipButton.on('pointerdown', () => {
            this.scene.start('MainGame');
        });

        skipButton.on('pointerover', () => {
            skipButton.setScale(1.1);
        });

        skipButton.on('pointerout', () => {
            skipButton.setScale(1);
        });
    }

    private createStarsEffect() {
        const { width, height } = this.scale;

        // Create twinkling stars
        for (let i = 0; i < 50; i++) {
            const star = this.add.circle(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(0, height),
                Phaser.Math.Between(1, 3),
                0xffffff,
                Phaser.Math.FloatBetween(0.3, 1),
            );

            // Animate star twinkling
            this.tweens.add({
                targets: star,
                alpha: { from: star.alpha, to: 0.1 },
                duration: Phaser.Math.Between(1000, 3000),
                yoyo: true,
                repeat: -1,
                delay: Phaser.Math.Between(0, 2000),
            });
        }
    }

    private animateText() {
        if (this.currentTextIndex >= this.storyTexts.length) {
            // Animation complete, show pulsing continue text
            this.showContinueText();
            return;
        }

        const { width, height } = this.scale;
        const text = this.storyTexts[this.currentTextIndex];

        // Calculate vertical position for centered text block
        const totalLines = this.storyTexts.length;
        const lineHeight = 40;
        const startY = height / 2 - (totalLines * lineHeight) / 2;
        const y = startY + this.currentTextIndex * lineHeight;

        if (text === '') {
            // Empty line, just move to next
            this.currentTextIndex++;
            this.time.delayedCall(200, () => {
                this.animateText();
            });
            return;
        }

        // Determine text style based on content
        let fontSize = '24px';
        let color = '#ffffff';
        let fontWeight = 'normal';

        if (text === 'MARS EXPEDITION') {
            fontSize = '48px';
            color = '#ff6b6b';
            fontWeight = 'bold';
        } else if (text.includes("Humanity's greatest adventure") || text.includes('The future of humanity')) {
            fontSize = '28px';
            color = '#ffd93d';
            fontWeight = 'bold';
        } else if (text.includes('10,000 gems')) {
            color = '#6bff6b';
            fontWeight = 'bold';
        }

        const textObject = this.add
            .text(width / 2, y, '', {
                fontSize: fontSize,
                color: color,
                fontWeight: fontWeight,
                align: 'center',
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#000000',
                    blur: 5,
                    fill: true,
                },
            })
            .setOrigin(0.5);

        this.displayedTexts.push(textObject);

        // Typewriter effect
        let charIndex = 0;
        const typewriterTimer = this.time.addEvent({
            delay: 50,
            callback: () => {
                charIndex++;
                textObject.setText(text.substring(0, charIndex));

                if (charIndex >= text.length) {
                    typewriterTimer.destroy();
                    this.currentTextIndex++;

                    // Add glow effect for important text
                    if (text === 'MARS EXPEDITION' || text.includes('10,000 gems')) {
                        this.tweens.add({
                            targets: textObject,
                            scaleX: { from: 1, to: 1.05 },
                            scaleY: { from: 1, to: 1.05 },
                            duration: 1000,
                            yoyo: true,
                            repeat: -1,
                            ease: 'Sine.easeInOut',
                        });
                    }

                    // Continue with next text after delay
                    this.time.delayedCall(300, () => {
                        this.animateText();
                    });
                }
            },
            repeat: text.length - 1,
        });
    }

    private showContinueText() {
        const { width, height } = this.scale;

        const continueText = this.add
            .text(width / 2, height - 100, 'Click anywhere to begin...', {
                fontSize: '24px',
                color: '#ffffff',
                align: 'center',
            })
            .setOrigin(0.5);

        // Pulsing animation
        this.tweens.add({
            targets: continueText,
            alpha: { from: 1, to: 0.3 },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });
    }
}
