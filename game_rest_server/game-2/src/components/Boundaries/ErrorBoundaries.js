import { Component } from "react";
import { ErrorPage } from "../Errors/ErrorPage";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('Error from Boundary');
    // this.setState({ hasError: true });
    return { hasError: true };
  }

  // componentDidCatch(error, info) {
  //   this.setState({ hasError: true });
  //   console.log('Error from Boundary');
  //   // You can log the error here if needed
  // }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      console.log("now render page");
      // You can render any custom fallback UI
      return <ErrorPage />

    }

    return this.props.children;
  }
}