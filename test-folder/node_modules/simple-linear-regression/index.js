function MAT_MUL(MAT1, MAT2) {
    try {
      if (MAT1.length == undefined || MAT1[0].length == undefined)
        throw Error("X not 2D");
      if (MAT2.length == undefined || MAT2[0].length == undefined)
        throw Error("y not 2D");
      if (MAT1[0].length != MAT2.length) throw Error("sizeOf X != sizeOf y");
      let ans = Array(MAT1.length)
        .fill(0)
        .map((x) => Array(MAT2[0].length).fill(0));
      for (let i = 0; i < MAT1.length; i++) {
        for (let j = 0; j < MAT2[0].length; j++) {
          for (let k = 0; k < MAT1[0].length; k++) {
            ans[i][j] += MAT1[i][k] * MAT2[k][j];
          }
        }
      }
      return ans;
    } catch (err) {
      console.log("MAT_MUL=>", err);
    }
  }
  function ErasePreviousLine(line = 1) {
    if (typeof line === "number" && line > 0)
      process.stdout.write(`\x1b[${line}A\r\x1b[K`);
  }
  function checkString(string) {
      if ( (Number(parseFloat(string)).toString()) === 'NaN') return true;
      else return false;
    }
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let randNum = parseInt(Math.round(Math.random() * i));
      [arr[i], arr[randNum]] = [arr[randNum], arr[i]];
    }
    return arr;
  }
  function iota(from, to) {
    let arr = new Array(to - from + 1);
    for (let i = 0; i < to - from + 1; i++) {
      arr[i] = from + i;
    }
    return arr;
  }
  
  class linear_model {
    constructor() {}
    read_CSV(d) {
      const fs = require("fs");
      let _DATA = fs.readFileSync(d, "utf8");
      _DATA = _DATA.split("\r\n");
      for (let i in _DATA) {
        _DATA[i] = _DATA[i].split(",");
      }
  
      for (let i = 0; i < _DATA.length; i++) {
        for (let j = 0; j < _DATA[i].length; j++) {
          if (!checkString(_DATA[i][j])) {
            _DATA[i][j] = parseFloat(_DATA[i][j]);
          }
        }
      }
      return _DATA;
    }
    Drop(Data, index) {
      if (index >= Data[0].length) throw Error("out of boundry");
      for (let row of Data) {
        row.splice(index, 1);
        console.log(row[index]);
      }
      return Data;
    }
    Insert(Data, index, newCol) {
      try {
        if (Data.length != newCol.length) throw Error("sizes not equal.");
        for (let i in Data) {
          Data[i].splice(index, 0, newCol[i]);
        }
        return Data;
      } catch (err) {
        console.log(err);
      }
    }
    Select(Data, index) {
      let _new = Array(Data.length)
        .fill(0)
        .map((x) => Array(1));
      for (let i in Data) {
        _new[i][0] = Data[i][index];
      }
      return _new;
    }
  }
  class SimpleLinearRegression extends linear_model {
    constructor(alpha = 0.01) {
      super();
      this.__meanX__ = undefined;
      this.__std_devX__ = undefined;
      this.__meanY__ = undefined;
      this.__std_devY__ = undefined;
      this.__theta__ = [[0], [0]];
      this.__alpha__ = alpha;
    }
    standardScaler_fitX(X) {
      try {
        if (X.length == undefined || X[0].length == undefined)
          throw Error("X not 2D");
        //console.log(X);
        const n = X.length;
        //mean = sum(x)/len(x)
        let mean = X.reduce((prev, cur) => prev + cur[0], 0);
        mean = mean / n;
  
        //std_dev = (1/len(x) * sum([ (x_i - mean)**2 for x_i in x]))**0.5
        let new_ = X.reduce(
          (prev, cur) => prev + (cur[0] - mean) * (cur[0] - mean),
          0
        );
        let std_dev = (1 / n) * new_;
        std_dev = Math.sqrt(std_dev);
  
        this.__meanX__ = mean;
        this.__std_devX__ = std_dev;
  
        //check std_dev == 0 or not.
        if (std_dev == 0) {
          const z_scores = X.map((x) => [0]);
          return z_scores;
        }
  
        //z_scores[i] = (x[i] - mean)/std_dev
        const z_scores = X.map((x) => [(x - mean) / std_dev]);
        return z_scores;
      } catch (err) {
        console.log("fitX" + err);
      }
    }
    standardScaler_unfitX(X) {
      try {
        if (X.length == undefined || X[0].length == undefined)
          throw Error("X not 2D");
  
        const new_ = X.map((x) => [x[0] * this.__std_devX__ + this.__meanX__]);
  
        return new_;
      } catch (e) {
        console.log("unfitX", e);
      }
    }
    standardScaler_fitY(y) {
      try {
        if (y.length == undefined || y[0].length == undefined)
          throw Error("y not 2D");
        const n = y.length;
        //mean = sum(y)/len(y)
        let mean = y.reduce((prev, cur) => prev + cur[0], 0);
        mean = mean / n;
  
        //std_dev = (1/len(y) * sum([ (y_i - mean)**2 for x_i in x]))**0.5
        let new_ = y.reduce(
          (prev, cur) => prev + (cur[0] - mean) * (cur[0] - mean),
          0
        );
        let std_dev = (1 / n) * new_;
        std_dev = Math.sqrt(std_dev);
  
        this.__meanY__ = mean;
        this.__std_devY__ = std_dev;
  
        //check std_dev == 0 or not.
        if (std_dev == 0) {
          const z_scores = y.map((x) => [0]);
          return z_scores;
        }
  
        //z_scores[i] = (y[i] - mean)/std_dev
        const z_scores = y.map((x) => [(x - mean) / std_dev]);
        return z_scores;
      } catch (err) {
        console.log(err);
      }
    }
    standardScaler_unfitY(y) {
      try {
        if (y.length == undefined || y[0].length == undefined)
          throw Error("y not 2D");
  
        const new_ = y.map((x) => [x[0] * this.__std_devY__ + this.__meanY__]);
  
        return new_;
      } catch (e) {
        console.log("unfit", e);
      }
    }
    h(X) {
      return MAT_MUL(X, this.__theta__);
    }
    J(m, X, y) {
      let sum = 0;
      const y_ = this.h(X);
      for (let i = 0; i < m; i++) {
        sum += (y_[i][0] - y[i][0]) * (y_[i][0] - y[i][0]);
      }
      return (1 / (2 * m)) * sum;
    }
    evaluate(XX, y) {
      try {
        let X = XX.slice(0).map((e) => e.slice());
        if (X.length != y.length) throw Error("sizeOf X != sizeOf y");
        if (X.length == undefined || X[0].length == undefined)
          throw Error("X not 2D");
        if (y.length == undefined || y[0].length == undefined)
          throw Error("y not 2D");
  
        X = this.Insert(X, 0, Array(X.length).fill(1));
  
        const m = X.length;
  
        return this.J(m, X, y);
      } catch (e) {
        console.log("evaluate", e);
      }
    }
    GradientDescent(m, X, y) {
      let sum0 = 0,
        sum1 = 0;
  
      const y_ = this.h(X);
      for (let i = 0; i < m; i++) {
        sum0 += y_[i][0] - y[i][0];
        sum1 += (y_[i][0] - y[i][0]) * X[i][1];
      }
  
      const val0 = (this.__alpha__ / m) * sum0;
      const val1 = (this.__alpha__ / m) * sum1;
  
      this.__theta__[0][0] -= val0;
      this.__theta__[1][0] -= val1;
    }
    fit(X_, y, iter = 10000) {
      try {
        let X = X_.slice(0).map((e) => e.slice());
        if (X.length != y.length) throw Error("sizeOf X != sizeOf y");
        if (X.length == undefined || X[0].length == undefined)
          throw Error("X not 2D");
        if (y.length == undefined || y[0].length == undefined)
          throw Error("y not 2D");
        X = this.Insert(X, 0, Array(X.length).fill(1));
        const m = X.length;
        const errors = [];
        let prev, cur, i;
  
        for (i = 0; i <= iter; i++) {
          if (prev != undefined) prev = cur;
          this.GradientDescent(m, X, y);
          cur = this.J(m, X, y);
          errors.push(cur);
          if (prev != undefined && Math.abs(cur - prev) == 0) break;
          prev = cur;
        }
        this.__theta__[0][0] = parseFloat(this.__theta__[0][0].toFixed(13));
        this.__theta__[1][0] = parseFloat(this.__theta__[1][0].toFixed(13));
      } catch (e) {
        console.log("fit", e);
      }
    }
    predict(XX) {
      try {
        let X = XX.slice().map((e) => e.slice());
        if (X.length == undefined || X[0].length == undefined)
          throw Error("X not 2D");
        X = this.Insert(X, 0, Array(X.length).fill(1));
  
        const cost = this.h(X);
  
        return cost;
      } catch (e) {
        console.log("predict => ", e);
      }
    }
  }
  
  function LabelEncoder() {}
  
  LabelEncoder.prototype.fit = function (data, col) {
    let alls = [];
    function findEle(ele) {
      for (let i of alls) {
        if (i == ele) {
          return true;
        }
      }
      return false;
    }
    for (let row of data) {
      if (!findEle(row[col])) {
        alls.push(row[col]);
      }
    }
    for (let i in data) {
      let ele = data[i][col];
      data[i][col] = alls.indexOf(ele);
    }
    return data;
  };
  
  function train_test_split(X, y, test_size = 0.2, random_state = false) {
    try {
      if (X.length != y.length) throw Error("sizeOf X != sizeOf y");
      if (X.length == undefined || X[0].length == undefined)
        throw Error("X not 2D");
      if (y.length == undefined || y[0].length == undefined)
        throw Error("y not 2D");
      let _N = iota(0, X.length - 1);
      if (random_state == true) _N = shuffle(_N);
  
      const n = X.length;
      let X_train = [],
        y_train = [],
        X_test = [],
        y_test = [];
  
      for (let i = 0; i < n; i++) {
        if ((i + 1) / n <= test_size) {
          X_test.push(X[_N[i]]);
          y_test.push(y[_N[i]]);
        } else {
          X_train.push(X[_N[i]]);
          y_train.push(y[_N[i]]);
        }
      }
      return [X_train, y_train, X_test, y_test];
    } catch (err) {
      console.log(err);
    }
  }
  
  module.exports = {
    SimpleLinearRegression,
    LabelEncoder,
    train_test_split,
  };
  