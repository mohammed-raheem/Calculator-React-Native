import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

function App() {
  const [calculationsValue, setCalculationsValue] = useState({
    calcValue: '',
    resultValue: '',
  });
  let operators = ['DEL', '+', '-', '*', '/'];

  const validateCalc = () => {
    switch (calculationsValue.calcValue.trim().slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  };

  const handleCalculation = () => {
    setCalculationsValue({
      ...calculationsValue,
      resultValue: validateCalc() && eval(calculationsValue.calcValue),
    });
  };

  const handlePress = (number) => {
    if (number == '=') {
      return handleCalculation();
    }

    setCalculationsValue({
      calcValue: calculationsValue.calcValue + number,
    });
  };

  const handleOperators = (operator) => {
    switch (operator) {
      case 'DEL':
        let text = calculationsValue.calcValue.trim().split('');
        text.pop();
        setCalculationsValue({calcValue: text.join('')});
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        let lastChar = calculationsValue.calcValue.trim().split('').pop();
        if (operators.indexOf(lastChar) > 0) return;
        if (calculationsValue.calcValue == '') return;
        setCalculationsValue({
          calcValue: `${calculationsValue.calcValue} ${operator} `,
        });
    }
  };

  let numbers = [
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1],
    ['.', 0, '='],
  ];
  let rows = [];

  for (let i = 0; i < numbers.length; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity
          key={numbers[i][j]}
          onPress={() => handlePress(numbers[i][j])}
          style={styles.btn}>
          <Text style={styles.btnText}>{numbers[i][j]}</Text>
        </TouchableOpacity>,
      );
    }
    rows.push(
      <View key={numbers[i]} style={styles.row}>
        {row}
      </View>,
    );
  }

  let ops = [];

  for (let i = 0; i < operators.length; i++) {
    ops.push(
      <TouchableOpacity
        key={operators[i]}
        onPress={() => handleOperators(operators[i])}
        style={styles.btn}>
        <Text style={[styles.btnText, styles.operatorText]}>
          {operators[i]}
        </Text>
      </TouchableOpacity>,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.calculations}>
        <Text style={styles.calcText}>{calculationsValue.calcValue}</Text>
      </View>
      <View style={styles.result}>
        <Text style={styles.resultText}>{calculationsValue.resultValue}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.numbers}>{rows.map((row) => row)}</View>
        <View style={styles.operators}>{ops.map((op) => op)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculations: {
    flex: 2,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calcText: {
    fontSize: 40,
    color: 'white',
    paddingTop: 40,
    paddingRight: 15,
  },
  result: {
    flex: 1,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 35,
    color: 'white',
    paddingBottom: 30,
    paddingRight: 15,
  },
  body: {
    flex: 6,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 30,
    fontFamily: 'VarelaRound-Regular',
  },
  operatorText: {
    fontSize: 25,
  },
  numbers: {
    flex: 5,
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  operators: {
    flex: 2,
    backgroundColor: '#f0f8ff',
    borderRightColor: '#1de9b6',
    borderRightWidth: 15,
  },
});

export default App;
