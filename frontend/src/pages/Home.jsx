import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';

function Home() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <nav>
      <Sidebar />
    </nav>
  );
}

export default Home;
