"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const ssr_1 = require("@supabase/ssr");
const createClient = () => (0, ssr_1.createBrowserClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
exports.createClient = createClient;
//# sourceMappingURL=client.js.map