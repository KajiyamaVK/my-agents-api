Source: https://jules.google/docs/changelog/2025-06-18

# Modernized base environment and updated toolchains

June 18, 2025

![Jules environment updates](/docs/_astro/changelog-env-update.C-4Kcp7e_Z1a9xXQ.webp)

We’ve overhauled the Jules development environment to move beyond the default Ubuntu 24.04 LTS packages. This includes:

*   Explicitly installing newer versions of key toolchains like Rust, Node, and Python, addressing long-standing version issues.
*   Adding finer-grained control over installation steps via custom scripts instead of relying solely on apt.
*   Introducing support for multiple runtimes, improved isolation, and version pinning to reduce drift and better match developer expectations.

These changes unblock several issues developers encountered with outdated dependencies and improve alignment with modern project requirements.

[Read about the Jules environment setup to learn more about what’s pre-installed.](https://jules.google/docs/environment/)