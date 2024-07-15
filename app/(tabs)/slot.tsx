import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stage, Sprite, Container, Graphics, Text as PixiText } from 'expo-pixi';

const SYMBOL_SIZE = 150;
const REEL_WIDTH = 160;

const SlotMachine = () => {
    const [running, setRunning] = useState(false);
    const [reelPositions, setReelPositions] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                const newPositions = reelPositions.map(() => Math.floor(Math.random() * 4));
                setReelPositions(newPositions);
            }, 300);

            return () => clearInterval(interval);
        }
    }, [running, reelPositions]);

    const startPlay = () => {
        if (running) return;
        setRunning(true);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stage width={REEL_WIDTH * 5} height={SYMBOL_SIZE * 3}>
                <Container>
                    {reelPositions.map((position, index) => (
                        <Sprite
                            key={index}
                            texture={`assets/${['eggHead.png', 'flowerTop.png', 'helmlok.png', 'skully.png'][position % 4]}`}
                            x={index * REEL_WIDTH}
                            y={position * SYMBOL_SIZE}
                            width={SYMBOL_SIZE}
                            height={SYMBOL_SIZE}
                        />
                    ))}
                </Container>
                <Graphics
                    draw={(g: any) => {
                        g.beginFill(0x000000);
                        g.drawRect(0, 0, REEL_WIDTH * 5, SYMBOL_SIZE);
                        g.endFill();
                    }}
                    x={0}
                    y={SYMBOL_SIZE * 3}
                />
                <PixiText
                    text="Spin the wheels!"
                    anchor={[0.5, 0.5]}
                    x={REEL_WIDTH * 2.5}
                    y={SYMBOL_SIZE * 3 + SYMBOL_SIZE / 2}
                    style={{
                        fontSize: 24,
                        fill: 'white',
                        fontWeight: 'bold',
                    }}
                />
            </Stage>
            <TouchableOpacity onPress={startPlay}>
                <Text>Spin</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SlotMachine;
