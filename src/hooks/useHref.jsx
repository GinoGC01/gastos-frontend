import { useNavigate } from 'react-router-dom';

export default function useHref() {
    const navigate = useNavigate();

    const handleClick = (route) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(route));
    } else {
      navigate(route);
    }
  }
  return (
    {
        handleClick
    }
  )
}
