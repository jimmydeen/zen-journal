# Zen Journal Frontend

## How to run local development server (both frontend and backend)
1. In another directory `git clone git@github.com:edward-20/zen-journal-supabase.git`. 
2. Follow the instructions on that repo's `README.md` to run containers locally that will provide supabase services.
3. In this repo, construct a `.env`, `.env.development` and provide each with:
* `REACT_APP_SUPABASE_URL` according to the result of `supabase start` in the supabase repo
* `REACT_APP_SUPABASE_KEY` according to the result of `supabase start` in the supabase repo
* `REACT_APP_BACKEND_API = https://journal-chat-backend-u7wru5pkua-ts.a.run.app/prompt`, a public api made to provide prompts based on url query parameters. For example: `https://journal-chat-backend-u7wru5pkua-ts.a.run.app/prompt?isStressed=yes&energy=high&overall=average`,
* `REACT_APP_NUM_TIMES_FETCH_FROM_BACKEND_OUT_OF_TEN = 6` to control the number of times in which a user will generate a prompt from the public backend api as opposed to reusing one from our database

## How to deploy (both frontend and backend)
The process of deploying will follow steps 1 and 2 from above but you'll need to `supabase link` - more about linking [supabase link](https://supabase.com/docs/reference/cli/supabase-link) - your 
supabase repo to a supabase project and `supabase db push` - more about pushing [supabase push](https://supabase.com/docs/reference/cli/supabase-db-push) - to that supabase project.

Importantly for the frontend you'll need to provide the environment variables
for `.env.prod` that use the deployed supabase values. You can find these on
your dashboard. Then follow the instructions for CRA deployment [here](https://create-react-app.dev/docs/deployment/).