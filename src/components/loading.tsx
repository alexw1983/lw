import * as React from "react";

interface Props {
  loading: boolean;
  toggleLoading: () => void;
}

const Loading = (props: Props) => {
  return <>{props.loading && <h1>Loading</h1>}</>;
};

export default Loading;
