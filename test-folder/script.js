// const {
//   SimpleLinearRegression,
//   train_test_split,
//   LabelEncoder,
// } = require("simple-linear-regression");

// const model = new SimpleLinearRegression();
// let data = model.read_CSV("../package/Salary_Data.csv");
// console.log(data);
//data = data.slice(1, data.length - 1);

// console.log(data);

// const LE = new LabelEncoder();
// data = LE.fit(data, 2);
// console.log(data);

// // X = model.Select(data, 0);
// // y = model.Select(data, 1);
// // // console.log(data);
// // // console.log(X);
// // // console.log(y);
// // X = model.standardScaler_fitX(X);
// // y = model.standardScaler_fitY(y);
// // console.log("fitX",X);
// // // X = SC.fit(X);
// // // y = SC.fit(y);

// // let [X_train, y_train, X_test, y_test] = train_test_split(X, y, 0.2, true);

// // // console.log(X)
// // // console.log(y)

// // // console.log(X_train);

// // model.fit(X_train, y_train);

// // X_train = model.standardScaler_unfitX(X_train);
// // y_train = model.standardScaler_unfitY(y_train);

// // console.log(X_train);
// // console.log(y_train);

// // const answer = model.evaluate(X_test, y_test);
// // console.log("answer", answer);
// // // console.log(model.theta);
// // let y_pred = model.predict(X_test);
// // y_pred=model.standardScaler_unfitY(y_pred);
// // console.log(y_pred);
