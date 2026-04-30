import { useNavigate } from "react-router-dom";

export default function ContactButton() {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate('/contact')}
      className="bg-castletonGreen hover:bg-darkSerpent text-white px-8 py-3 rounded-2xl font-medium transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-castletonGreen/30"
    >
      Contact Us
      <span className="text-earthYellow">→</span>
    </button>
  );
}