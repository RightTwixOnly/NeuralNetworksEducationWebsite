//F-function whether it is nice out or not
function Func(x){
    if (x >= 0){
        return 1;//nice outside
    }else{
        return 0;//not nice outside
    }
}

//creating the class perceptron
class Perceptron {
    constructor(n, learningRate = 0.1){
        this.weights = []; //weights (4)
        this.learningRate = learningRate;
        this.iterations = 0;
        this.results = [0, 0, 0, 0, 0, 0, 0]
        this.accuracy = 0;
        for (let i = 0; i < n; i++) {//set the 4 weights to 0
            this.weights.push(0);
        }
    }

    //DELETE THIS!!!!!!!!!!! testing to see what the weight #'s
    test(){
        return this.weights;
    }

    //predict function
    predict(x){
        let weightSum = 0;//sum of all the weights
        for (let i in this.weights){//for each weight (4)
            weightSum += this.weights[i] * x[i];//multiply each weight by forecast
        }
        // return the F-function of the sum of all the weights
        return (Func(weightSum));
    }

    //train function, forecast(list of each day's forecast), actual(list of intended results)
    train(forecast, actual, iterations){
        //main iteration loop
        for (let i = 0; i < iterations; i++){
            //for each day in the forecast
            for (let j in forecast){
                this.results[j] = this.predict(forecast[j]);//predicting if its nice
            }
            //loop for all of the days in set (iterate through each day)
            for (let k = 0; k < ((this.results).length); k++){
                //if a day is predicted incorrectly run the weight balance for that day
                if (this.results[k] != actual[k]){
                    //weight balance for each weight in the day
                    for (let z = 0; z < ((this.weights).length); z++){
                        this.weights[z] = this.weights[z] + this.learningRate * (actual[k]-this.results[k]) * forecast[k][z]
                    }          
                }  
            }
        }
        return this.results//return the results after (iterations)
    }
    //check the accuracy of the AI
    accuracyScore(actual){
        let correct = 0;
        let total = actual.length;
        //for each day
        for (let i in actual){
            //check if it guessed right or not
            if (actual[i] == this.results[i]){
                correct += 1;
            }
            //correct guesses divided by the total days
            this.accuracy = correct/total;   
        }
        //output accuracy %
        return this.accuracy;
    }
}

forecast = [[75, 1, 0, 1], [98, 3, 0, 1], [70, 1, 0.3, 0], [60, 2, 7.0, -1], [75, 3, 3.0, -2], [80, 2, 0.3, 0], [80, 1, 0, 1]];
test = [1, 0, 1, 0, 0, 1, 1];

function start(){
    brain = new Perceptron(4);
    brain.train(forecast, test, 2900);
    console.log(brain.test());
    console.log(brain.accuracyScore(test))
    document.write(brain.accuracyScore(test))
}


//[1, 0, 1, 0, 0, 1, 1]
//for (let i in (forecast.length)){


//console.log(brain.accuracyScore(test))