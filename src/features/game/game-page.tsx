import { createGame } from './index';

export default async function GamePage() {
  const game = await createGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            🎭 Guess Who? 🎭
          </h1>
          <div className="badge badge-success badge-lg text-white font-semibold">
            {game.status === 'waiting' ? '🎮 Ready to Play!' : game.status}
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">
            👥 Choose Your Mystery Person
          </h2>
          
          {/* People Grid */}
          <div className="grid grid-cols-2 gap-4">
            {game.people.map((person: any, index: number) => (
              <div key={index} className="card bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="card-body p-4 text-center">
                  {/* Avatar placeholder with fun emoji */}
                  <div className="avatar placeholder mb-3">
                    <div className="bg-gradient-to-br from-yellow-300 to-orange-400 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg">
                      {person.name.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Name */}
                  <h3 className="card-title text-lg font-bold text-purple-800 justify-center">
                    {person.name}
                  </h3>
                  
                  {/* Fun action button */}
                  <div className="card-actions justify-center mt-3">
                    <button className="btn btn-primary btn-sm rounded-full px-6 hover:btn-secondary transition-colors">
                      🎯 Pick Me!
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Game Instructions */}
          <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border-2 border-dashed border-green-300">
            <div className="text-center">
              <h3 className="font-bold text-green-800 mb-2">🎲 How to Play</h3>
              <p className="text-sm text-green-700">
                Pick a person and ask yes/no questions to guess who your friend chose!
              </p>
            </div>
          </div>

          {/* Start Game Button */}
          <div className="text-center mt-6">
            <button className="btn btn-lg btn-success rounded-full px-8 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              🚀 Start Playing!
            </button>
          </div>
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-sm font-medium">
            ✨ Have fun guessing! ✨
          </p>
        </div>
      </div>
    </div>
  );
}
