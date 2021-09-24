import { Suspense, Component } from "react";
import { LoadingIndicator } from "@/components/index";

class SuspenseErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.setState({
      errMsg: error.message,
    });
  }

  render() {
    return (
      <Suspense fallback={<LoadingIndicator />}>
        {this.state.hasError ? (
          <div>{this.state.errMsg}</div>
        ) : (
          this.props.children
        )}
      </Suspense>
    );
  }
}

export default SuspenseErrorBoundary;
