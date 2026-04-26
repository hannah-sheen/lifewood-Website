export default function ContactButton() {
  return (
    <button 
      onClick={() => alert("Contact form would open here (you can replace with modal or email link)")}
      className="bg-castletonGreen hover:bg-darkSerpent text-white px-8 py-3 rounded-2xl font-medium transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-[#046241]/30"
    >
      Contact Us
      <span className="text-earthYellow">→</span>
    </button>
  );
}