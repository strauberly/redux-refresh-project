# redux-refresh-project

Project is built as practice over learned concepts with redux while adding more advanced elements.

---

--18 Oct 2022--

- Setup getting response from cart submission in app.js.
- Created notification object in ui slice.
- Created dispatch for all notification scenarios.
- Altered project so there is not an initial submission on first loading of the page.
- Currently providing results as expected simulated error by changing env config address and then sending with expected results.

--17 Oct 2022--

- Objects are now correctly loaded to supabase backend. So in summary we built a fat reducer, kept are other components clean with side effect.

- Loaded notification resources from Max into UI component and these will be utilized in handling http states and responses.

--12 Oct 2022--

- Closer. Objects are at least correct and not simply undefined. However getting a {"message":"No API key found in request"} and 400 response vs a 404 from earlier.

The challenge is the reward.

---

--10 Oct 2022--

- Lectures on dumb vs smart backends and where to run logic on the frontend with a dumb backend.
- Lectures for keeping reducers fat with logic but sans useEffect and async.
- Began syncing up supabase backend for storing a cart.
- Code incomplete and to be refined. Program inoperable at this time. Resume with api call in app.

---

--9 Oct 2022--

- created cart slice
- added reducer to index.js
- add to cart maps items in product we create an array of dummy items
- wired cart button and badge to update for each item updated
- refactored allowing for grouping items together in cart
- wired handlers for removing and adding items from the cart

---

--6 Oct 2022--
Began building store and slices for ui and cart. current functionality is cart toggles back and forth between showing and not.
