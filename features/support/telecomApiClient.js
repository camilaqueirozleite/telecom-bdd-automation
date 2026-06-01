async function activateSimCard(customerData) {
  if (process.env.API_BASE_URL) {
    return activateSimCardViaApi(customerData);
  }

  return activateSimCardMock(customerData);
}

async function activateSimCardViaApi(customerData) {
  if (typeof fetch !== 'function') {
    throw new Error('Global fetch is not available. Use Node.js 18 or newer.');
  }

  const response = await fetch(`${process.env.API_BASE_URL}/sim-cards/activation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerData)
  });

  const body = await response.json();

  return {
    status: response.status,
    ...body
  };
}

function activateSimCardMock(customerData) {
  if (!customerData.customerId || !customerData.iccid) {
    return {
      status: 400,
      message: 'Invalid customer data'
    };
  }

  return {
    status: 201,
    message: 'SIM card activated successfully'
  };
}

module.exports = {
  activateSimCard
};
