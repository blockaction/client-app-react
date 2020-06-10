import React, { Component } from "react";
import Layout from "components/layout";
import { Container, Row, Accordion, Card } from "react-bootstrap";
import InnerPageBanner from "components/Common/InnerPageBanner";
import * as action from "utils/api";
import { withRouter } from "next/router";
import ContentUnavailable from "components/Common/ContentUnavailable";

const faqData = [1, 2, 3, 4, 5];

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOpen: null,
      indexOpen2: null,
    };
  }

  static async getInitialProps() {
    // const faqData = await action
    //   .getData("faq")
    //   .then(res => res && res.data && res.data.dataList);
    // return { faqData };
  }

  handleClick = (index) => {
    const { indexOpen } = this.state;
    index !== indexOpen
      ? this.setState({ indexOpen: index })
      : this.setState({ indexOpen: null });
  };

  handleClick2 = (index) => {
    const { indexOpen2 } = this.state;
    index !== indexOpen2
      ? this.setState({ indexOpen2: index })
      : this.setState({ indexOpen2: null });
  };

  render() {
    // const { faqData } = this.props;
    const { indexOpen, indexOpen2 } = this.state;

    return (
      <Layout
        websiteTitle="FAQs - ETH 2.0 | Blockaction"
        websiteDescription=""
        websiteKeywords=""
        metaDataFlag={true}
      >
        <Container>
          {" "}
          <InnerPageBanner pageTitle="FAQs" />
        </Container>
        <section className="faq-section pattern-box">
          <Container>
            <Row>
              <div className="col-12">
                <h2 className="title center-line text-center mb-0">
                  Frequently Asked Questions
                </h2>
              </div>
            </Row>
            <p className="faq-subtitle">ETH 2.0 FAQ </p>
            <Accordion>
              <Card onClick={() => this.handleClick("1")}>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  What is Ethereum 2.0?
                  <i
                    className={
                      indexOpen === "1"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    Ethereum 2.0, also called Eth2 or ‘Serenity’, is the next
                    upgrade to the Ethereum blockchain. Ethereum 2.0 will be
                    released in multiple “Phases” starting in 2020 with Phase 0.
                    Each phase will improve the functionality and performance of
                    Ethereum in different ways. More information about Ethereum
                    2.0: What is Ethereum 2.0? & The Ethereum 2.0 Glossary
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card onClick={() => this.handleClick("2")}>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  What is the difference between Ethereum 1.0 and Ethereum 2.0?{" "}
                  <i
                    className={
                      indexOpen === "2"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    There are two primary improvements introduced by Ethereum
                    2.0 that do not exist in Ethereum 1.0: Proof of Stake and
                    Shard Chains.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card onClick={() => this.handleClick("3")}>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  Proof of Stake
                  <i
                    className={
                      indexOpen === "3"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    Currently, Ethereum 1.0 runs on a consensus mechanism known
                    as Proof of Work (PoW). PoW relies on physical computing
                    power (miners) and electricity (work) to build blocks on the
                    blockchain. Proof of Stake (PoS) is an upgrade which enables
                    improved security, scalability, and energy efficiency.
                    Instead of relying on physical miners and electricity, PoS
                    relies on validators (virtual miners) and deposits of ether.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick("4")}>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                  Shard Chains
                  <i
                    className={
                      indexOpen === "4"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    Shard chains are a scalability mechanism which drastically
                    improves the throughput of the Ethereum blockchain.
                    Currently, having a single chain made up of consecutive
                    blocks is incredibly secure and makes information easy to
                    verify. However, requiring each full node to process and
                    validate each transaction in consecutive blocks can affect
                    the ability to process transactions quickly – especially in
                    times of high mainnet activity. Shard chains are a mechanism
                    through which the Ethereum blockchain is “split” – thus
                    dividing the data processing responsibility among many
                    nodes. This allows for transactions to be processed in
                    parallel rather than consecutively. Each shard chain is like
                    adding another lane to upgrade Ethereum from a single lane
                    road to a multiple lane highway. More lanes and parallel
                    processing leads to much higher throughput. Shard chains are
                    expected to be rolled out in Phase 1 of Ethereum 2.0.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick("5")}>
                <Accordion.Toggle as={Card.Header} eventKey="5">
                  What is the Ethereum 2.0 roadmap? What are the phases of
                  Ethereum 2.0?
                  <i
                    className={
                      indexOpen === "5"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="5">
                  <Card.Body>
                    Ethereum 2.0 is planned to be rolled out in at least three
                    phases: Phase 0, 1, and 2. Phase 0 is planned to launch in
                    2020, with Phases 1 and 2 to be released in following years.
                    <p>
                      <b>Phase 0:</b> In the first phase of Ethereum 2.0, the
                      “Beacon Chain” will be implemented. The Beacon Chain
                      stores and manages the registry of validators, and will
                      implement the Proof of Stake (PoS) consensus mechanism for
                      Ethereum 2.0. The original Ethereum PoW chain will
                      continue to run alongside the new Ethereum PoS chain,
                      ensuring there is no break in data continuity.
                    </p>{" "}
                    <p>
                      <b>Phase 1:</b> The second phase of Ethereum 2.0 will
                      likely roll out in 2021. The primary improvement of Phase
                      1 is the integration of shard chains. Shard chains are a
                      scalability mechanism in which the Ethereum blockchain is
                      “split” into 64 different chains, which allows for
                      parallel transaction, storing, processing of information.
                      At its most conservative estimate it will enable 64 times
                      more throughput than Ethereum 1.0, but it is designed to
                      be able to handle several hundred times more data than
                      Ethereum 1.0.
                    </p>{" "}
                    <p>
                      <b>Phase 2:</b> The third phase of Ethereum 2.0 will
                      likely be launched in 2021 or 2022. This phase is
                      currently less clearly defined than the above two phases,
                      but will involve adding ether accounts and enabling
                      transfers and withdrawals, implementing cross-shard
                      transfers and contract calls, building execution
                      environments so that scalable applications can be built on
                      top of Ethereum 2.0, and bringing the Ethereum 1.0 chain
                      into Ethereum 2.0 so that Proof of Work can finally be
                      turned off. Many further improvements are planned for
                      research and development after Phase 2 is complete.
                      Vitalik provides insight into some of these improvements
                      in this easy-to-digest diagram.
                    </p>{" "}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick("6")}>
                <Accordion.Toggle as={Card.Header} eventKey="6">
                  What will change when Ethereum 2.0 is completed? What will the
                  improvements mean?
                  <i
                    className={
                      indexOpen === "6"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="6">
                  <Card.Body>
                    Ethereum 2.0 will primarily benefit the scalability,
                    throughput, and security of the Ethereum public mainnet.
                    Ethereum 2.0 will not eliminate any of the data history,
                    transaction records, or asset ownership of the Ethereum 1.0
                    chain. The Beacon Chain – which will be the backbone of
                    Ethereum 2.0 – will be fully functional with the existing
                    1.0 chain, ensuring continuity. A helpful analogy to
                    understand the distinction between Eth1 and Eth2 comes from
                    Joseph Chow, who describes the distinction as a road vs. a
                    highway.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick("7")}>
                <Accordion.Toggle as={Card.Header} eventKey="7">
                  What will happen to the current Ethereum “1.0” chain?
                  <i
                    className={
                      indexOpen === "7"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="7">
                  <Card.Body>
                    The current plan is for the Ethereum 1.0 chain to
                    effectively become the first shard on Ethereum 2.0 when
                    Phase 1 launches. Until then, the Ethereum 1.0 chain will
                    continue as it is now and will undergo improvements to
                    enable it to eventually be an Ethereum 2.0 shard.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick("8")}>
                <Accordion.Toggle as={Card.Header} eventKey="8">
                  What is Ethereum Proof of Stake?
                  <i
                    className={
                      indexOpen === "8"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="8">
                  <Card.Body>
                    <p>
                      Proof of Stake (PoS) is an upgrade from Ethereum 1.0’s
                      current Proof of Work consensus model and allows for
                      improved security and scalability. PoS is a consensus
                      mechanism that relies on validators and staked ETH for the
                      continuation of blocks on the blockchain, and is necessary
                      for sharding. Validators are people who elect to continue
                      the blockchain by depositing (or “staking”) 32 ETH into
                      the deposit contract. On a continuous basis, validators
                      are randomly selected from the pool of all validators to
                      be given the opportunity to create the next block. Should
                      a validator successfully validate a block, they will
                      receive an ETH reward. If a validator attempts to
                      compromise the truthful continuation of the blockchain,
                      their deposit will be ‘slashed’ – meaning they will lose
                      some or all of their 32 staked ETH.
                    </p>
                    <p>
                      A Proof of Stake mechanism offers more crypto-economic
                      security compared to the more abstract disincentive of
                      losing the cost associated with electricity. Rather than
                      investing in an enormous mining facility to defray the
                      cost of electricity to mine blocks in PoW, staking on
                      Ethereum 2.0 will only require a consumer laptop (some
                      software clients aim to be lightweight enough to run on a
                      cell phone, thus reducing the barrier to entry to
                      participating in the consensus process, consequently
                      increasing the decentralization of the network). Proof of
                      Stake will go live in Phase 0 of Ethereum 2.0.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick("9")}>
                <Accordion.Toggle as={Card.Header} eventKey="9">
                  How can I become a validator for Ethereum 2.0?
                  <i
                    className={
                      indexOpen === "9"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="9">
                  <Card.Body>
                    <p>
                      The switch from Proof of Work to Proof of Stake will
                      create a unique revenue-generating capability for ETH
                      holders. ETH holders can become validators on the Ethereum
                      network and stake their ETH in order to receive rewards
                      when they successfully validate and attest a new block
                    </p>
                    <p>
                      One can become a validator on the Ethereum 2.0 network by
                      depositing 32 ETH. This can be done in one of two ways.
                      You can run your own validator node and stake the ETH
                      yourself. The second option is to stake your ETH using a
                      staking provider, a number of which will likely come to
                      market in the weeks and months before the launch. There
                      will be both custodial and non-custodial staking services
                      offered.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick("10")}>
                <Accordion.Toggle as={Card.Header} eventKey="10">
                  How do you get rewarded for staking on Ethereum 2.0?
                  <i
                    className={
                      indexOpen === "10"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="10">
                  <Card.Body>
                    <p>
                      As a validator on Ethereum 2.0, you get rewarded for
                      proposing and attesting the next block in the chain. You
                      will receive rewards in ETH for making valid proposals and
                      attestations.
                    </p>
                    <p>
                      Rewards are dynamically calculated based on the state of
                      the network upon epoch completion. Network level reward
                      issuance rates are a function of the total amount of ETH
                      staked and average % online of validator(s). Individual
                      validator reward rates depend on the the number of
                      validators run and % uptime of the validator.
                    </p>
                    <p>
                      Rewards minus penalties are transferred to validators
                      every epoch (384 seconds ~6.5 minutes). As a result, the
                      reward you expect to receive when being randomly selected
                      to be a validator may be different than what a validator
                      actually receives. Check out the Ethereum 2.0 Calculator
                      for an idea of the types of rewards for staking on
                      Ethereum 2.0.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick("11")}>
                <Accordion.Toggle as={Card.Header} eventKey="11">
                  Who is developing Ethereum 2.0?
                  <i
                    className={
                      indexOpen === "11"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="11">
                  <Card.Body>
                    <p>
                      Hundreds of people! The work is largely led and
                      coordinated by the Ethereum Foundation research team, but
                      many other research and implementation teams are making
                      substantial contributions. The main work is to collaborate
                      on defining the specification for Ethereum 2.0, which is
                      maintained on the Ethereum Foundation GitHub pages. Seven
                      independent teams are building Ethereum 2.0 clients in a
                      variety of different programming languages for different
                      use cases and are constantly feeding back into the design
                      and specifications.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <p className="faq-subtitle">Staking FAQ</p>
            <Accordion>
              <Card onClick={() => this.handleClick2("12")}>
                <Accordion.Toggle as={Card.Header} eventKey="12">
                  How is reward or penalty calculated?{" "}
                  <i
                    className={
                      indexOpen2 === "12"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="12">
                  <Card.Body>
                    On the protocol level, time is broken up into 6.4 minute
                    increments, called epochs, where duties are algorithmically
                    assigned to every participating validator. At the end of
                    every epoch, participation is scored, and every properly
                    performing validator is given a micro-reward or
                    micro-penalty according to their involvement.
                    <p className="mt-4">
                      For more details{" "}
                      <a
                        href="https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/configuration/#inactivity_penalty_quotient"
                        target="_blank"
                      >
                        click here
                      </a>
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card onClick={() => this.handleClick2("13")}>
                <Accordion.Toggle as={Card.Header} eventKey="13">
                  Will I be slashed if my node goes inactive due to power or
                  internet failure?{" "}
                  <i
                    className={
                      indexOpen2 === "13"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="13">
                  <Card.Body>
                    The protocol will not “slash” inactive validators, merely
                    subtract any incremental earnings as incremental penalties.
                    This means that as long as your validator is online more
                    than 2/3 of the time, you will still turn a profit.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick2("14")}>
                <Accordion.Toggle as={Card.Header} eventKey="14">
                  Can I stop validating once active?{" "}
                  <i
                    className={
                      indexOpen2 === "14"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="14">
                  <Card.Body>
                    You have the option to voluntarily exit after at least 256
                    epochs later. This exit procedure tells the protocol to stop
                    giving your validator duties to perform, stopping you from
                    earning any additional rewards or getting any additional
                    penalties.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick2("15")}>
                <Accordion.Toggle as={Card.Header} eventKey="15">
                  Can I rejoin once slashed or voluntarily exit?{" "}
                  <i
                    className={
                      indexOpen2 === "15"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="15">
                  <Card.Body>
                    If you’ve performed a voluntary exit, or been slashed, you
                    won’t be able to rejoin. This means if you want to be a
                    validator again, it’ll require an additional 32 ETH deposit
                    and a new validator account.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card onClick={() => this.handleClick2("16")}>
                <Accordion.Toggle as={Card.Header} eventKey="16">
                  Can I withdraw my reward or staked ETH if I choose to
                  voluntarily exit?{" "}
                  <i
                    className={
                      indexOpen2 === "16"
                        ? "icon-chevron-right open"
                        : "icon-chevron-right"
                    }
                  ></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="16">
                  <Card.Body>
                    All funds put into staking will be locked up at the protocol
                    level until at least Phase 1 of the Eth2 rollout. This
                    includes base staking funds and any earned rewards, whether
                    you’ve exited or not. Once the functionality is eventually
                    rolled out, you’ll be able to withdraw/transact your
                    precious ETH.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Container>
        </section>
        <section className="reference-section mt-5">
          <Container>
            <Row>
              <div className="col-md-12">
                <h2 className="title">References</h2>
              </div>
              <div className="col-md-12">
                <ul>
                  {/* <li>
                    <a
                      href="https://docs.prylabs.network/docs/how-prysm-works/ethereum-2-public-api/"
                      target="_blank"
                    >
                      PryLabs Network-Docs
                      (https://docs.prylabs.network/docs/how-prysm-works/ethereum-2-public-api/)
                    </a>
                  </li> */}
                  {/* <li>
                    <a href="https://api.prylabs.network/" target="_blank">
                      PryLabs Network (https://api.prylabs.network/)
                    </a>
                  </li> */}
                  <li>
                    <a
                      href="https://mdlol.github.io/md/?r=ethereum/eth2.0-specs&p=specs/phase0/beacon-chain.md"
                      target="_blank"
                    >
                      Technical aspects : Eth2.0 Specs
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/chainsafe-systems/8-things-every-eth2-validator-should-know-before-staking-94df41701487" target="_blank">
                       Lodestar
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/ethereum/eth2.0-specs" target="_blank">
                       Github Eth2.0-Specs
                    </a>
                  </li>
                </ul>
              </div>
            </Row>
          </Container>
        </section>
      </Layout>
    );
  }
}

export default withRouter(FAQ);
