import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: "csxe1qvv",
    dataset: "production",
    apiVersion: "v1",
    token: 'sknN692nwZM7WQu7DyhWwf540Ulic2TCGTpTqoujAapKeIIPWtHxbp74OFh3WwhqOzhzQauwY7ctBpeiV0oVFELYhBL4dEnOwCzArcnxm68o9dbIhp7inI6GYprcCjYfSrPzQXJzZgRfljUHinFa5iCkCUJanobjoVjgwcjGZJ95x4OWQ5Ty',
    useCdn: "false",
    ignoreBrowserTokenWarning: true
})