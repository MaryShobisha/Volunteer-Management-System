import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

const LeaderboardComponent = () => {
  // const leaderboardData = [
  //   { rank: 1, name: 'Alice', score: 1500 },
  //   { rank: 2, name: 'Bob', score: 1200 },
  //   { rank: 3, name: 'Charlie', score: 1000 },
  //   { rank: 4, name: 'David', score: 900 },
  //   { rank: 5, name: 'Eve', score: 800 },
  // ];

  const [leaderboardData, setLeaderBoardData] = useState([])

  useEffect(() => {
    const fetchProjectsCategory = async () => {
            try {
              const jwtToken = localStorage.getItem('jwtToken');;
              const leaderboard  = await fetch(`http://localhost:3200/api/users/leaderboard`, {
                method: 'GET',
    headers: {
            'Authorization': `Bearer ${jwtToken}`, 
            'Content-Type': 'application/json',   
          }
    })
              const leaderboardDetail = await leaderboard.json();
              console.log(leaderboardDetail)
              setLeaderBoardData(leaderboardDetail)
            } catch (err) {
              console.error(err);
              setError('Could not load projects.');
            } 
          };
      
          fetchProjectsCategory();  
  }, [])
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player) => (
              <tr key={player.rank}>
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardComponent;
