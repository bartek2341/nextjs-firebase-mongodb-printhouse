import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { Button, Buttons } from "@/components/index";
import { scrollTop } from "@/lib/index";

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  static Page = ({ children, props }) => {
    return children(props);
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
    };
  }

  next = (values) => {
    this.props.changePageNumber(this.props.pageNumber + 1);
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));
    scrollTop();
  };

  previous = () => {
    this.props.changePageNumber(this.props.pageNumber - 1);
    this.setState((state) => ({
      page: Math.max(state.page - 1, 0),
    }));
    scrollTop();
  };

  validate = (values) => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
    }
  };

  render() {
    const { children, router, t } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
          },
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            {React.cloneElement(activePage, { props: { ...props } })}
            <Buttons right>
              {page === 0 && (
                <Button responsive type="button" onClick={() => router.back()}>
                  {t("common:return")}
                </Button>
              )}
              {page > 0 && (
                <Button responsive type="button" onClick={this.previous}>
                  {t("common:back")}
                </Button>
              )}
              {!isLastPage && (
                <Button green responsive type="submit">
                  {t("common:next")}
                </Button>
              )}
              {isLastPage && (
                <Button
                  responsive
                  disabled={props.submitting}
                  green
                  type="submit"
                >
                  {t("realization:submitOrder")}
                </Button>
              )}
            </Buttons>
          </form>
        )}
      </Form>
    );
  }
}
