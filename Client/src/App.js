import './css/App.css';
import CommetsData from './components/commentsData';
import CommetsDataSentiment from './components/commentsDataSentiment';

function App() {
  return (
    <div >
      <p>
        <CommetsData />
      </p>
      <p>
        {/* <CommetsDataSentiment /> */}
      </p>
    </div>
  );
}

export default App;
