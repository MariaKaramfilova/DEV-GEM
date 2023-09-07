import React, { useContext, useEffect, useState } from "react";
import { Button, Link, Table } from "@mui/joy";
import Pagination from "../../views/Pagination/Pagination.tsx";
import { Typography } from "@mui/joy";
import { cancelStripeSubscription, getStripeInvoiceLinkById, getStripeSubscriptionsByUser } from "../../services/payment.services.ts";
import { AuthContext } from "../../context/AuthContext.ts";
import Stripe from "stripe";
import { SIMPLE_DATE_FORMAT, SUBSCRIPTIONS_PER_PAGE } from "../../common/common.ts";
import moment from "moment";

const AccountSubscriptions = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState<Stripe.Subscription[]>([]);
  const [subscriptionsToDisplay, setSubscriptionsToDisplay] = useState<Stripe.Subscription[]>();
  const [currentInvoice, setCurrentInvoice] = useState<{[key: string]: string}>({});

  console.log(subscriptions);

  const getInvoice = async (id: string) => {
    const invoice = await getStripeInvoiceLinkById(id);
    setCurrentInvoice(prevState => ({...prevState, [id]: invoice.hosted_invoice_url}));
  }

  const handleCancel = async (id: string) => {
    try {
      const response = await cancelStripeSubscription(id);
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    (async () => {
      const result = await getStripeSubscriptionsByUser(loggedInUser.uid);
      setSubscriptions(result);
      result.forEach(subscription => getInvoice(subscription.latest_invoice));
    })();
  }, []);

  return (
    <div>
      <Typography level="h3" marginBottom="2em">My subscriptions</Typography>
      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Add-on</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Expiration date</th>
            <th style={{ textAlign: "center" }}>Price</th>
            <th style={{ textAlign: "center" }}>Billing interval</th>
            <th style={{ textAlign: "center" }}>Invoice</th>
            <th style={{ textAlign: "center" }}>Cancellation link</th>
          </tr>
        </thead>
        <tbody>
          {subscriptionsToDisplay?.map((subscription) => (
            <tr key={subscription.id}>
              <td>{subscription.metadata.addon_name}</td>
              <td>{subscription.status}</td>
              <td>{moment.unix(subscription.current_period_end).format(SIMPLE_DATE_FORMAT)}</td>
              <td>${subscription.items.data[0].price.unit_amount / 100}</td>
              <td>/per {subscription.items.data[0].price.recurring?.interval}</td>
              <td><Link href={currentInvoice[subscription.latest_invoice]}>View latest invoice</Link></td>
              <td><Link onClick={async () => await handleCancel(subscription.id)}>Cancel subscription</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination data={subscriptions} itemsPerPage={SUBSCRIPTIONS_PER_PAGE} setData={setSubscriptionsToDisplay} />
    </div>
  )
}

export default AccountSubscriptions
