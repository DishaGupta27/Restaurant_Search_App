import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import restaurants from "../../public/restaurants.json";
import { Rnd } from "react-rnd";
import logo from '../assets/fastor-logo.png';

export default function RestaurantDetail() {
    const { id } = useParams();
    const restaurant = restaurants.find((r) => r.id === Number(id));
    const [logoPos, setLogoPos] = useState({ x: 0, y: 0 });
    const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (imageLoaded && imageRef.current) {
            const img = imageRef.current;
            const centerX = (img.clientWidth - logoSize.width) / 2;
            const centerY = (img.clientHeight - logoSize.height) / 2;
            setLogoPos({ x: centerX, y: centerY });
        }
    }, [imageLoaded, logoSize.width, logoSize.height]);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleShare = async () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const restaurantImage = new Image();
        const logoImage = new Image();

        restaurantImage.crossOrigin = "anonymous";
        logoImage.crossOrigin = "anonymous";

        restaurantImage.src = restaurant.image;
        logoImage.src = "/src/assets/fastor-logo.png";

        restaurantImage.onload = () => {
            canvas.width = restaurantImage.width;
            canvas.height = restaurantImage.height;
            ctx.drawImage(restaurantImage, 0, 0);
            ctx.drawImage(
                logoImage,
                logoPos.x,
                logoPos.y,
                logoSize.width,
                logoSize.height
            );

            canvas.toBlob(async (blob) => {
                const file = new File([blob], "restaurant.png", { type: "image/png" });
                if (navigator.share) {
                    await navigator.share({
                        title: "Fastor Restaurant",
                        text: "Check out this place on Fastor!",
                        files: [file],
                    });
                } else {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "restaurant.png";
                    link.click();
                }
            });
        };
    };

    const handleDownload = async () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const restaurantImage = new Image();
        const logoImage = new Image();

        restaurantImage.crossOrigin = "anonymous";
        logoImage.crossOrigin = "anonymous";

        restaurantImage.src = restaurant.image;
        logoImage.src = "/src/assets/fastor-logo.png";

        restaurantImage.onload = () => {
            canvas.width = restaurantImage.width;
            canvas.height = restaurantImage.height;
            ctx.drawImage(restaurantImage, 0, 0);
            ctx.drawImage(
                logoImage,
                logoPos.x,
                logoPos.y,
                logoSize.width,
                logoSize.height
            );
            canvas.toBlob((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "restaurant.png";
                link.click();
            });
        };
    };

    if (!restaurant)
        return <div className="text-center mt-10">Restaurant not found</div>;

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-start bg-gradient-to-b from-green-50 to-white text-gray-800 overflow-hidden">
            {/* 🌿 Header */}
            {/* Unified Navbar */}
            <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md shadow-md border-b border-green-100">
                <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
                    {/* Logo + App Name */}
                    <div className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="Fastor logo"
                            className="w-10 h-10 object-contain"
                        />
                        <h1 className="text-green-600 font-bold text-2xl">Fastor</h1>
                    </div>


                    {/* Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="text-green-600 border border-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition font-medium"
                    >
                        ← Back
                    </button>
                </div>
            </header>


            {/* 🍽 Centered Content */}
            <main className="flex flex-col items-center justify-center flex-1 w-full px-4">
                <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>

                <div className="relative w-[80vw] max-w-3xl h-[60vh] bg-white rounded-2xl shadow-lg overflow-hidden">
                    <img
                        ref={imageRef}
                        src={restaurant.image}
                        alt={restaurant.name}
                        onLoad={handleImageLoad}
                        className="w-full h-full object-cover rounded-2xl select-none"
                    />

                    {/* 🏷️ Draggable Logo */}
                    {imageLoaded && (
                        <Rnd
                            size={{ width: logoSize.width, height: logoSize.height }}
                            position={{ x: logoPos.x, y: logoPos.y }}
                            onDragStop={(e, d) => setLogoPos({ x: d.x, y: d.y })}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                setLogoSize({
                                    width: parseInt(ref.style.width),
                                    height: parseInt(ref.style.height),
                                });
                                setLogoPos(position);
                            }}
                            bounds="parent"
                            lockAspectRatio
                            dragGrid={[1, 1]}
                            enableUserSelectHack={false}
                        >
                            <div className="w-full h-full flex items-center justify-center bg-transparent cursor-move">
                                <img
                                    src={logo}
                                    alt="Fastor Logo"
                                    className="w-full h-full object-contain pointer-events-none select-none"
                                    draggable="false"
                                />
                            </div>
                        </Rnd>
                    )}
                </div>

                {/* ⚙️ Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={handleShare}
                        className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md transition-all"
                    >
                        Share Restaurant
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-6 py-3 bg-white border border-green-400 text-green-600 rounded-full hover:bg-green-50 shadow-sm transition-all"
                    >
                        Download Image
                    </button>
                </div>

                <canvas ref={canvasRef} className="hidden"></canvas>
            </main>
        </div>
    );
}
