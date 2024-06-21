import { useState, useRef, useEffect } from 'react';
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import {Carousel, Carousel_Rotate_Left, Carousel_Rotate_Right, images} from '../Carousel/Carousel';


const Home = () => {
    const [isMuted, setIsMuted] = useState(false); // Initialize as muted
    const audioRef = useRef(null); // Ref for the audio element     
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [downloadType, setDownloadType] = useState(null); // State to track selected download type

    const handleRotateLeft = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };
    
    const handleRotateRight = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    };
    


    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0.5 : 0; // Set volume to 1 if currently muted, 0 if currently unmuted
            if (isMuted) {
                audioRef.current.play().catch(err => {
                    console.error("Error playing audio:", err);
                });
            } else {
                audioRef.current.pause();   
            }
        }
    };

    useEffect(() => {
        setCurrentImageIndex(0);
        toggleMute();
        const handleLocationChange = () => {
            setIsMuted(true); 
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);
    
    useEffect(() => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            videoElement.onplay = () => {
                setVideoPlaying(true);
            };
            videoElement.onerror = () => {
                setVideoPlaying(false);
            };
        }
        if (audioRef.current) {
            audioRef.current.play().catch(err => {
                console.error("Error playing audio:", err);
            });
        }
    }, []);

    const handleDownload = () => {
        let downloadLink = '';

        switch (downloadType) {
            case 'windows':
                downloadLink = 'https://drive.google.com/uc?export=download&id=1lHRB4EOvokiN0LybZw75ij7rI1a_WWZ9';
                break;
            case 'mac':
                downloadLink = 'https://drive.google.com/uc?export=download&id=1lHRB4EOvokiN0LybZw75ij7rI1a_WWZ9';
                break;
            case 'linux':
                downloadLink = 'https://drive.google.com/uc?export=download&id=1lHRB4EOvokiN0LybZw75ij7rI1a_WWZ9';
                break;
            default:
                // Handle default case if no type is selected
                break;
        }

        if (downloadLink) {
            window.open(downloadLink, '_blank');
        } else {
            // Handle case where no type is selected
            console.error('Please select a download type.');
        }
    };

    return (
        <div className="home-page-container">
            <Navbar />

            <div class="picture-carousel">
                <img src="main_menu.gif" alt="bolCover" class="w-full h-full border-4 border-custom-purple" style={{borderRadius: "1vh"}}/>
            </div>

            <div>
                <div className="description-text">A visual novel game created by the Open Source Club at the University of Florida</div>
            </div>

            <div className="Carousel border-4 border-custom-purple w-3/5 ">
                <Carousel imageIndex={currentImageIndex} />
                <div className="button-container">
                    <Carousel_Rotate_Left onRotate={handleRotateLeft} />
                    <Carousel_Rotate_Right onRotate={handleRotateRight} />
                </div>

            </div>

            <div className="download-title">
                How to Play
            </div>

            <div className="download-box">
                {/* Select OS Buttons */}
                <div className="btn-group-vertical" role="group" aria-label="Vertical download toggle button group">
                    <label className={`btn-circle btn-outline-danger ${downloadType === 'windows' ? 'active' : ''}`} onClick={() => setDownloadType('windows')}>
                        <input type="radio" className="btn-check" autoComplete="off" />
                        <img src="images/windows.png" alt="Windows Icon" className="os-icon-win"/>
                    </label>
                    <label className={`btn-circle btn-outline-danger ${downloadType === 'mac' ? 'active' : ''}`} onClick={() => setDownloadType('mac')}>
                        <input type="radio" className="btn-check" autoComplete="off" />
                        <img src="images/apple.png" alt="Mac Icon" className="os-icon-mac"/>
                    </label>
                    <label className={`btn-circle btn-outline-danger ${downloadType === 'linux' ? 'active' : ''}`} onClick={() => setDownloadType('linux')}>
                        <input type="radio" className="btn-check" autoComplete="off" />
                        <img src="images/linux.png" alt="Linux Icon" className="os-icon-lin"/>
                    </label>
                </div>

                {/* Download Button */}
                <button onClick={handleDownload} className="btn-download">
                    <p className="btn-download-txt">Download Now!</p>
                </button>

                {/* OS Texts */}
                <div className="os-text-group" role="group">
                    <p className="os-text">Windows</p>
                    <p className="os-text">MacOS</p>
                    <p className="os-text">Linux</p>
                </div>

                <div className="os-prompt-container">
                    <p className="os-prompt-text">Please Select Your<br/>Operating System</p>
                </div>
            </div>

            <button onClick={toggleMute} className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center justify-center rounded">
            {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553Z" />
                        <path strokeLinecap="round" d="M3 3l18 18" />
                    </svg>
                ) : (

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553Z" />
                    </svg>
                )}
            </button>            

            <audio ref={audioRef} src="main_menu.mp3" loop />
        </div>
    );
};

export default Home;
