import { Octokit } from "octokit";
import { GITHUB_PRIVATE_KEY, GITHUB_TOKEN } from "../common/common.ts";

export const octokit = new Octokit({
  auth: GITHUB_TOKEN
});