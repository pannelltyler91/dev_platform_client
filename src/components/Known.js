import { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";


class Known extends Component {
  render() {
    return (
      
        <Card bg="light" style={{ margin: "5px" }}>
          <p>Please select the languages you know(maximum of 3):</p>
          <Form.Group id="known">
            {["checkbox"].map((type) => (
              <div key={`inline-${type}-known`} className="mb-3">
                <Form.Check
                  inline
                  label="Java"
                  name="Java"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="Python"
                  name="Python"
                  type={type}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  inline
                  label="JavaScript"
                  name="JavaScript"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="PHP"
                  name="PHP"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="Wordpress"
                  name="Wordpress"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label=".NET"
                  name=".NET"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="C#"
                  name="C#"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="C++"
                  name="C++"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="COBOL"
                  name="COBOL"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="Curl"
                  name="Curl"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="Node"
                  name="Node"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="Go"
                  name="Go"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="Kotlin"
                  name="Kotlin"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="HTML"
                  name="HTML"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="CSS"
                  name="CSS"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="R"
                  name="R"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="Ruby"
                  name="Ruby"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="SQL"
                  name="SQL"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  inline
                  label="TypeScript"
                  name="TypeScript"
                  type={type}
                  id={`inline-${type}-3`}
                />
              </div>
            ))}
          </Form.Group>
        </Card>
      
    );
  }
}

export default Known;