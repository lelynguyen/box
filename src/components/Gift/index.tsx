// src/components/Gift/index.tsx
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import './styles.css';

const MAX_OPENS = 5;

interface GiftContent {
    id: number;
    message: string;
    color: string;
}

const GIFTS: GiftContent[] = [
    { id: 1, message: "Có một ngừi iu tuỵt vời ^^", color: "#FF6B6B" },
    { id: 2, message: "Đấm bóp trong 15p!", color: "#4ECDC4" },
    { id: 3, message: "Một ly trà sữa!", color: "#45B7D1" },
    { id: 4, message: "Chụp Photobooth bất cứ khi nào em thích!", color: "#96CEB4" },
    { id: 5, message: "Giành rửa chén cho em cho đến khi hết năm 4!", color: "#FFEEAD" },
    { id: 6, message: "Chở đi ăn gà, hehehe", color: "#D4A5A5" },
    { id: 7, message: "Mua cho em một món đồ bất kỳ trong siêu thị!", color: "#9B59B6" },
    { id: 8, message: "Một bé gấu bông <150k", color: "#3498DB" },
    { id: 9, message: "Tặng một giá đỡ điện thoại như cái của anh!", color: "#E74C3C" },
    { id: 10, message: "Có tất cả các món quà trong blind box luôn :>", color: "#2ECC71" }
];

// Hàm tạo vị trí xoay ngẫu nhiên
const getRandomPosition = () => {
    const rotation = Math.random() * 360;
    return {
        '--rotation': `${rotation}deg`
    } as React.CSSProperties;
};

const Gift = () => {
    const [openedGifts, setOpenedGifts] = useState<number[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [isCompleted, setIsCompleted] = useState(false);

    const handleGiftClick = (gift: GiftContent) => {
        if (openedGifts.includes(gift.id)) return;
        if (openedGifts.length >= MAX_OPENS) {
            setIsCompleted(true);
            return;
        }

        setOpenedGifts([...openedGifts, gift.id]);
        setCurrentMessage(gift.message);

        // Ẩn message sau 3 giây
        setTimeout(() => {
            setCurrentMessage('');
            if (openedGifts.length + 1 >= MAX_OPENS) {
                setIsCompleted(true);
            }
        }, 9000);
    };

    return (
        <div className="gifts-container">
            {isCompleted && (
                <div className="alert-summary-2column">
                    <div className="chosen-column">
                        <h3>5 món quà emiu đã mở:</h3>
                        <ul>
                            {openedGifts.map(id => (
                                <li key={id}>{GIFTS.find(g => g.id === id)?.message}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="remaining-column">
                        <h3>Những món quà đã bỏ lỡ:</h3>
                        <ul>
                            {GIFTS.filter(g => !openedGifts.includes(g.id)).map(gift => (
                                <li key={gift.id}>{gift.message}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="alert-actions">
                        <button className="close-button" onClick={() => window.location.reload()}>
                            Chơi lại
                        </button>
                    </div>
                </div>
            )}

            {!isCompleted && (
                <>
                    <div className="gifts-grid">
                        {GIFTS.map(gift => (
                            <div
                                key={gift.id}
                                role="button"
                                tabIndex={0}
                                className={`gift ${openedGifts.includes(gift.id) ? 'opened' : ''}`}
                                style={{
                                    ...getRandomPosition(),
                                    backgroundColor: gift.color,
                                }}
                                onClick={() => handleGiftClick(gift)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleGiftClick(gift);
                                    }
                                }}
                                aria-label={`Món quà số ${gift.id}`}
                            >
                                <div className="gift-box">🎁</div>
                            </div>
                        ))}
                    </div>
                    {currentMessage && (
                        <div className="message-popup">
                            {currentMessage}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Gift;