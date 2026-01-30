import { Users, MessageCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Connect. Collaborate. Code. 💻
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          DevTinder helps developers connect, collaborate, and grow together —
          find teammates for projects, mentors, or coding buddies worldwide.
        </p>
        <button
          className="bg-[#605dff] hover:bg-[#5248e6] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
          onClick={() => {
            !user ? navigate("/login") : navigate("/feed");
          }}
        >
          Join the Community
        </button>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-colors">
          <div className="flex justify-center mb-6">
            <Users className="w-16 h-16 text-[#605dff]" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Connect with Developers</h3>
          <p className="text-gray-400">
            Find like-minded developers to collaborate on open source or
            freelance projects.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-colors">
          <div className="flex justify-center mb-6">
            <MessageCircle className="w-16 h-16 text-[#605dff]" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Live Chat & Networking</h3>
          <p className="text-gray-400">
            Stay connected through our real-time chat system built with
            Socket.io.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-colors">
          <div className="flex justify-center mb-6">
            <Zap className="w-16 h-16 text-[#605dff]" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Premium Features</h3>
          <p className="text-gray-400">
            Unlock premium features like profile boosting and advanced search
            via Stripe integration.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#605dff] mt-20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Dev Match?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of developers building amazing projects together
          </p>
          <button
            className="bg-white text-[#605dff] hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
            onClick={() => {
              !user ? navigate("/login") : navigate("/feed");
            }}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;