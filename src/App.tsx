import Board from "./components/Board/board";

const App = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Board />
    </div>
  );
};

export default App;
