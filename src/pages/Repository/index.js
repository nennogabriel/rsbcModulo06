import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { Loading } from './styles';

export default class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    loading: true,
  };

  render() {
    const { loading } = this.state;
    const { navigation } = this.props;
    const { html_url: uri } = navigation.getParam('repository');
    return (
      <>
        {loading && (
          <Loading>
            <ActivityIndicator />
          </Loading>
        )}
        <WebView
          injectedJavaScript='document.body.children[0].style.display = "none";'
          allowsBackForwardNavigationGestures
          onLoadEnd={() => this.setState({ loading: false })}
          source={{ uri }}
        />
      </>
    );
  }
}
