


export const getBox=(mineNum,gridSize)=>{

    var box = []
    for(let i=0;i<gridSize;i++){
        var temp = []
        for(let j=0;j<gridSize;j++){
            temp.push({val:0, appear:false})
        }
        box.push(temp)
    }
    let mine = 0;
    const mineBox = []
    while(mine<mineNum){
        let x = Math.floor(Math.random() * gridSize)
        let y = Math.floor(Math.random() * gridSize)
        if(box[x][y].val!==-1){
            box[x][y].val=-1;
            mine++;
            let tmp = [x,y];
            mineBox.push(tmp)
        }
    }
    for (let g=0;g<mineBox.length;g++){
        let val = mineBox[g]
        let x = val[0]
        let y = val[1];
        for(let i=-1;i<2;i++){
            for(let j=-1;j<2;j++){
                let r = x+i;
                let c = y+j;
                if(r<0 || c<0 || r+1>gridSize || c+1>gridSize)
                    continue;
                if(box[r][c].val!==-1){
                    box[r][c].val++;
                }
            }
        }
    }
    return box;

}