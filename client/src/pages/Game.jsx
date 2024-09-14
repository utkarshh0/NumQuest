// import { useEffect, useState } from "react";
// import Leaderboard from "../components/Leaderboards";
// import PlayingArea from "../components/PlayingArea";
// import RecentScores from "../components/RecentScores";
// import Avatar from "react-avatar";
// import axios from "axios";
// import { GiHamburgerMenu } from "react-icons/gi";

// export default function Game(){

//     const [recentScore, setRecentScore] = useState(null)
//     const [username, setUsername] = useState('');
//     const [loading, setLoading] = useState(true);
    
//     useEffect(() => {
//           fetchUser();
//     },[])

//     const fetchUser = async () => {
//         try {
//             const token = localStorage.getItem('token')
//             const response = await axios.get('https://numquest.onrender.com/user', 
//                 {
//                     headers: {
//                         Authorization: token
//                     },
//                 }
//             );
//             setUsername(response.data.username)
//             setRecentScore(response.data.recentScores)
//         } catch (err) {
//           console.error(err)
//         } finally {
//           setLoading(false);
//         }
//       };

//       const onGameEnd = () => {
//         fetchUser()
//       }
      
//     return(
//         <div className="h-screen w-screen overflow-hidden tracking-widest text-white bg-zinc-800 lg:p-16 flex lg:space-x-8">
//             <div className="text-3xl font-semibold absolute p-2"><GiHamburgerMenu /></div>
//             <div className="w-1/5 hidden lg:block">
//               {recentScore && <RecentScores recentScore={recentScore} />}
//               {/* <button className="p-1 bg-[#273b40] hover:opacity-75 border border-2 w-full py-2 rounded-lg my-4 outline-none">Reset</button> */}
//               <div className="flex items-center space-x-2 lg:absolute lg:left-10 lg:bottom-10">
//                   <Avatar name={username} size="45" className="rounded-full" />
//                   <p>{username}</p>
//               </div>
//             </div>
//             <PlayingArea onGameEnd={onGameEnd} />
//             <Leaderboard />
//       </div>
//     )
// }



import { useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard";
import PlayingArea from "../components/PlayingArea";
import RecentScores from "../components/RecentScores";
import Avatar from "react-avatar";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../components/Sidebar"; // Import the new Sidebar component

export default function Game() {
    const [recentScore, setRecentScore] = useState(null);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://numquest.onrender.com/user', 
                {
                    headers: {
                        Authorization: token
                    },
                }
            );
            setUsername(response.data.username);
            setRecentScore(response.data.recentScores);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onGameEnd = () => {
        fetchUser();
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    console.log(recentScore)
    return (
        <div className="h-screen w-screen overflow-hidden tracking-widest text-white bg-zinc-800 lg:p-16 flex lg:space-x-8">
            <div className="text-3xl font-semibold absolute p-2 lg:hidden cursor-pointer" onClick={toggleSidebar}>
                <GiHamburgerMenu />
            </div>
            {/* {recentScore &&  */}
                <Sidebar
                    username={username}
                    recentScore={recentScore}
                    isVisible={isSidebarVisible}
                    onClose={toggleSidebar}
                />
            {/* } */}
            <div className={`lg:w-1/5 hidden lg:block `}>
                {/* The sidebar will be hidden on large screens */}
                {recentScore && <RecentScores recentScore={recentScore} />}
                <div className="flex items-center space-x-2 lg:absolute lg:left-10 lg:bottom-10">
                    <Avatar name={username} size="45" className="rounded-full" />
                    <p>{username}</p>
                </div>
            </div>
            <PlayingArea onGameEnd={onGameEnd} />
            <Leaderboard />
        </div>
    );
}
