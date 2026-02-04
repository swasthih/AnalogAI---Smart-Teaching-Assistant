
import React, { useState, useCallback, useEffect } from 'react';
import { UserLevel, ExplanationResponse, HistoryItem } from './types';
import { generateExplanation } from './services/geminiService';
import Header from './components/Header';
import TopicInput from './components/TopicInput';
import ExplanationResult from './components/ExplanationResult';
import HistorySidebar from './components/HistorySidebar';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<UserLevel>(UserLevel.STUDENT);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExplanationResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async (overrideTopic?: string) => {
    const targetTopic = overrideTopic || topic;
    if (!targetTopic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await generateExplanation(targetTopic, level);
      setResult(response);
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        data: response,
        timestamp: Date.now()
      };
      setHistory(prev => [newItem, ...prev].slice(0, 10));
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLevelChange = (newLevel: UserLevel) => {
    setLevel(newLevel);
  };

  const loadFromHistory = (item: HistoryItem) => {
    setResult(item.data);
    setTopic(item.data.topic);
    setLevel(item.data.level);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-50">
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 space-y-8">
        <Header />
        
        <div className="space-y-6">
          <TopicInput 
            topic={topic}
            setTopic={setTopic}
            level={level}
            onLevelChange={handleLevelChange}
            onExplain={() => handleExplain()}
            loading={loading}
          />

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">Simplifying it for you...</p>
            </div>
          ) : result ? (
            <ExplanationResult result={result} />
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="text-6xl text-slate-200">💡</div>
              <h2 className="text-xl font-semibold text-slate-400">Ready to learn something new?</h2>
              <p className="text-slate-400 max-w-xs mx-auto">Enter a topic above and I'll explain it using a fun analogy.</p>
            </div>
          )}
        </div>
      </div>

      <HistorySidebar 
        history={history} 
        onSelect={loadFromHistory}
      />
    </div>
  );
};

export default App;
