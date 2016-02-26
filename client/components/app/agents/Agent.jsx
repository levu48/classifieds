import Codemirror from 'react-codemirror';

Agent = React.createClass({ 
    componentWillMount() {
        let Message = function(message) {
            this.text = message;
        } 
       
       const FLOW_NAME = "Hello World";
       let flow = nools.getFlow(FLOW_NAME);
       if (!flow) {
            flow = nools.flow(FLOW_NAME, function(flow) {
                flow.rule("Hello", [Message, "m", "m.text =~ /^hello\\sworld$/"], function(facts) {
                    facts.m.text = facts.m.text + " goodbye";
                    this.modify(facts.m);
                });
                
                flow.rule("Goodbye", [Message, "m", "m.text =~ /.*goodbye$/"], function(facts) {
                    console.log(facts.m.text);
                });
            });
       }
       
       let session = flow.getSession();
       session.assert(new Message("hello world"));
       
       let runSession = function(session) {
            session.match(function(e) {
                if (e) console.log(e.stack);
                else {
                    console.log("done");
                }
            });
       }
       
       console.log("runSession", session);
       runSession(session);

    },
    
    render() {
        return (<div>
            <h3>Agent</h3>
            </div>
        )
    }
});


Agent3 = React.createClass({
    getInitialState: function() {
        return {
            code: "// Code"
        };
    },
    
    
    updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
    },
    
    
    render: function() {
        var options = {
            lineNumbers: true
        };
        return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
    }
});