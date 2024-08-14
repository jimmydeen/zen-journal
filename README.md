# Zen Journal Frontend
A journalling web application that encourages users to foster this healthy habit in the pursuit of mindfulness.

## Contributing
### Features
For any feature that you'd like to see, create a branch from the `develop` branch named `feature/<feature-name>`. Once completed, make a pull request to the `develop` branch. The request will be rejected if it doesn't pass unit tests.
### Release
Once the suite of features necessary for a release has been completed, make a release branch named `release/x.y.z` from the `develop` branch. The request wil be rejected if it doesn't pass the integration and e2e tests.
### Production
If a release branch is successfully cut off from `develop`, make a pull request to main, which may have other tests and will deploy the application.
### Issues
For any issues that are present that need to be resolved please create a branch from the commit where the issue was found called `bugfix/<issue-id>`. 

## How to run local development server (both frontend and backend)
1. In another directory `git clone git@github.com:edward-20/zen-journal-supabase.git`. 
2. Follow the instructions on that repo's `README.md` to run containers locally that will provide supabase services.
3. In this repo, construct a `.env`, `.env.development` and provide each with:
* `REACT_APP_SUPABASE_URL` according to the result of `supabase start` in the supabase repo
* `REACT_APP_SUPABASE_KEY` according to the result of `supabase start` in the supabase repo
* `REACT_APP_BACKEND_API = https://journal-chat-backend-u7wru5pkua-ts.a.run.app/prompt`, a public api made to provide prompts based on url query parameters. For example: `https://journal-chat-backend-u7wru5pkua-ts.a.run.app/prompt?isStressed=yes&energy=high&overall=average`,
* `REACT_APP_NUM_TIMES_FETCH_FROM_BACKEND_OUT_OF_TEN = 6` to control the number of times in which a user will generate a prompt from the public backend api as opposed to reusing one from our database

## CORS Errors
You may get CORS errors when your React tries to AJAX to your local supabase service.
If you use chrome, [chrome doesn't allow cors requests to localhost](https://stackoverflow.com/questions/10883211/why-does-my-http-localhost-cors-origin-not-work)

There is an issue concerning [CORS requests to the Auth service of a local supabase](https://github.com/supabase/supabase/issues/28008).

## How to deploy (both frontend and backend)
The process of deploying will follow steps 1 and 2 from above but you'll need to `supabase link` - more about linking [supabase link](https://supabase.com/docs/reference/cli/supabase-link) - your 
supabase repo to a supabase project and `supabase db push` - more about pushing [supabase push](https://supabase.com/docs/reference/cli/supabase-db-push) - to that supabase project.

Importantly for the frontend you'll need to provide the environment variables
for `.env.prod` that use the deployed supabase values. You can find these on
your dashboard. Then follow the instructions for CRA deployment [here](https://create-react-app.dev/docs/deployment/).