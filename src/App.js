import "./App.css";
import Box from "./components/Box";
import { getBox } from "./utils/util";
import { useEffect, useState, useRef } from "react";
import usetimer from "./utils/useTimer";

function App() {
  const [mineBox, setMineBox] = useState(null);
  const [mine, setMine] = useState(10);
  const [gridSize, setGridSize] = useState(10);
  const [check, setCheck] = useState(false);
  const [win, setWin] = useState(false);
  const [block, setBlock] = useState(0);
  const [move, setMove] = useState(0);
  const [time, pauseTime, resumeTime, resetTime] = usetimer(0);
  const [curr, setCurr] = useState(0);
  const [maxMoveTime, setMaxMoveTime] = useState(0);
  const inputRef = useRef(null);
  const mineRef = useRef(null);
  //const [moveTme, movePauseTime, moveResumeTime] = usetimer(0)

  const changeBlock = (x, y) => {
    const updatedMineBox = [...mineBox];
    updatedMineBox[x][y] = { ...updatedMineBox[x][y], appear: true };
    setMineBox(updatedMineBox);
  };

  const initGrid = () => {
    let val;
    if (inputRef.current.value) {
      val = inputRef.current.value;
    } else {
      val = 10;
    }
    let mineNum = mine;
    setGridSize(val - 0);
    if (mine >= val * val) {
      setMine(1);
      mineNum = 1;
    }
    const mineBox = getBox(mineNum, val);
    setMineBox(mineBox);
    setCheck(false);
    setWin(false);
    setBlock(0);
    setMove(0);
    resetTime();
    setCurr(0);
    setMaxMoveTime(0);
  };

  useEffect(() => {
    initGrid();
  }, []);
  useEffect(() => {
    if (block === 0) pauseTime();

    let max = Math.max(maxMoveTime, time - curr);
    setMaxMoveTime(max);
    setCurr(time);

    if (block > 0) resumeTime();
    console.log(block, mine, gridSize);
    if (block + mine == gridSize * gridSize) {
      setWin(true);
      pauseTime();
    }
  }, [block]);

  const handleclick = (x, y) => {
    if (check || mineBox[x][y].appear) return;

    if (mineBox[x][y].val === -1) {
      pauseTime();
      changeBlock(x, y);
      setCheck(true);
      return;
    }
    changeBlock(x, y);
    setBlock((prev) => prev + 1);

    if (mineBox[x][y].val === 0) {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i == 0 && j == 0) continue;
          let nx = x + i;
          let ny = y + j;
          if (nx < 0 || ny < 0 || nx + 1 > gridSize || ny + 1 > gridSize)
            continue;
          if (mineBox[nx][ny].appear === false) handleclick(nx, ny);
        }
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pt-16 flex h-[200vh] flex-col md:flex-row">
        <div className="md:basis-3/12 mt-6 flex flex-col">
          <div className="text-center timefont font-bold  ">
            <span className="text-xl text-white font-bold myfont mr-2">
              time taken:
            </span>
            {time} Sec
          </div>
          <div className="text-center timefont font-bold  mr-2">
            <span className="text-xl text-white font-bold myfont">Moves: </span>
            {move}
          </div>
          <div className="text-center timefont font-bold">
            <span className="text-xl text-white font-bold myfont mr-2">
              Max Move time:
            </span>
            {maxMoveTime} Sec
          </div>
        </div>
        <div className="md:basis-6/12">
          <div
          className={`grid justify-center items-center auto-cols-min ${win? ' animate-pulse':''}`}
          style={{
            gridTemplateRows: `repeat(${gridSize}, minmax(30px, 30px))
        `,
            gridTemplateColumns: `repeat(${gridSize}, minmax(30px, 30px))
        `,
          }}
        >
          {mineBox?.map((box, x) =>
            box.map((val, y) => {
              return (
                <Box
                  key={(x + 1) * (y + 1)}
                  x={x}
                  y={y}
                  handleclick={handleclick}
                  setMove={setMove}
                  val={val}
                />
              );
            })
          )}
          
        </div>
        <div className="congfont  w-fit text-center m-auto  px-2 py-4 rounded-lg mt-5 font-extrabold text-transparent md:text-8xl text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-bounce">
            {win ? 'Congratulation' :' '}
          </div>
          </div>
        <div className="md:basis-3/12 flex flex-col gap-2  items-center">
          {/* <div class="container">
            <input
              class="input"
              type="number"
              
            />
            <label class="label  font-bold">Mines</label>
          </div>
          <div class="container mt-6">
            <input class="input" type="number" ref={inputRef} />
            <label class="label font-bold"> grid size</label>
          </div> */}
          
          <input type="text" name="text" class="input" pattern="\d+" 
          onChange={(e) => setMine(e.target.value - 0)}
          ref = {mineRef}
          placeholder="Mines" />
          <input type="text" name="text" class="input" pattern="\d+" 
          ref={inputRef}
          placeholder="Grid Size" />
          <button className="mt-24 w-fit text-black button-name text-center" onClick={() => initGrid()}>            
            Start
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
