import './css/App.css';
import CommetsData from './components/commentsData';
import CommetsDataSentiment from './components/commentsDataSentiment';


function App() {
  return (
    <div>
      <CommetsData/>
      {/* <div style={{ width: "1200px", height: "600px", backgroundColor: "#282c34" }} >
        <CommetsData />

      </div> */}
      {/* <div style={{ width: "800px", height: "400px", backgroundColor: "#282c34" }} >
      <CommetsDataSentiment />

      </div> */}
    </div>
  );
}

export default App;
