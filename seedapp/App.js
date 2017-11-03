import React from 'react';
import { Header, StyleSheet, Text, View, ScrollView, Button, Alert} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
const URL = 'https://jdbh.dk/backend/CA3Group4Server/';
console.ignoredYellowBox = ['Remote debugger'];
export default class App extends React.Component {

  constructor(){
    super();
    this.state = {data : []};
    this.getAll = this.getAll.bind(this);
    this.getAll();
  }

  getAll() {
    fetch(URL + "api/places/all")
      .then((response) => {
        return response.json()})
      .then((responseJson) => {
        var arr = responseJson;
          this.setState({data : responseJson});
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  render() {
    const tableHead = ['id', 'city', 'description' , 'geo', 'imageuri', 'rating', 'street', 'zip'];

    const mapped = this.state.data.map(function(element)
    { return [element.id, element.city, element.description, element.geo, element.imageuri, element.rating, element.street, element.zip] })

    return (

      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <Text style={{textAlign: 'center'}}>Places-data from the server:</Text>
        <Table>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={mapped} style={styles.row} textStyle={styles.text}/>      
        </Table>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
 
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { textAlign: 'center', fontSize : 10},
  row: { height: 70 }
});