import { useNavigate } from 'react-router-dom';
import Button from './Button.tsx';

export default function ContactButton() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/contact')} className="px-8 py-3 rounded-2xl shadow-lg shadow-darkSerpent/20">
      Contact Us →
    </Button>
  );
}
