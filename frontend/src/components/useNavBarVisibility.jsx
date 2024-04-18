import { useLocation } from 'react-router-dom';

function useNavbarVisibility() {
  const location = useLocation();
  return location.pathname !== "/";
}

export default useNavbarVisibility;