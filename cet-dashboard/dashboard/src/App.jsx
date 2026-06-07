import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Trends from './pages/Trends.jsx';
import Writing from './pages/Writing.jsx';
import Reading from './pages/Reading.jsx';
import Listening from './pages/Listening.jsx';
import Translation from './pages/Translation.jsx';
import Vocab from './pages/Vocab.jsx';
import Timeline from './pages/Timeline.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/listening" element={<Listening />} />
        <Route path="/translation" element={<Translation />} />
        <Route path="/vocab" element={<Vocab />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </Layout>
  );
}
