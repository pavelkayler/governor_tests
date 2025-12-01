import { ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";

const Voters = ({ proposalId }) => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    (async () => {
      await viewProposal(proposalId).then((data) => {
        setProposal(data);
      });
      await viewState(proposalId).then((data) => {
        setState(data);
      });
      await setVoters(proposal.voters);
    })();
  }, [proposal]);
  console.log(voters);
  return voters.map((voter, index) => <ListGroupItem key={index}>{voter}</ListGroupItem>);
};

export { Voters };
