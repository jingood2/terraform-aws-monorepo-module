// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from "constructs";
import { App } from "cdktf";
import { ProviderRequirement, TFModuleOutput, TFModuleStack, TFModuleVariable } from "@cdktf/tf-module-stack";
import { Resource } from "@cdktf/provider-null/lib/resource";
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';

class MyAwesomeModule extends TFModuleStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Add null provider
    new ProviderRequirement(this, "null", "~> 2.0");

    // Add aws provider
    new ProviderRequirement(this, "aws", "~> 11.0.10");

    // define resources here
    const resource = new Resource(this, "resource");

    new S3Bucket(this, "bucket", {
      bucketPrefix: `jingood2`,
    });

    new TFModuleVariable(this, "my_var", {
      type: "string",
      description: "A variable",
      default: "default",
    });


    new TFModuleOutput(this, "my_output", {
      value: resource.id,
    });

  }
}

const app = new App();
new MyAwesomeModule(app, "terraform-aws-s3-bucket");

/* new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "jingood2",
  workspaces: new NamedCloudWorkspace("terraform-aws-module-null")
}); */
app.synth();
