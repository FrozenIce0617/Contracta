import gql from 'graphql-tag';

export const CreateContractDocument = gql`
  mutation CreateContract($input: CreateContractInput!) {
    createContract(input: $input) {
      id
      name
      description
      rawtext
      pages
      url
      date
      arn
      Stats {
        alerts
        actions
        version
      }
      state
    }
  }
`;

export const UpdateContractDocument = gql`
  mutation UpdateContract($input: UpdateContractInput!) {
    updateContract(input: $input) {
      id
      name
      description
      rawtext
      pages
      url
      date
      arn
      Stats {
        alerts
        actions
        version
      }
      state
    }
  }
`;

export const DeleteContractDocument = gql`
  mutation DeleteContract($input: DeleteContractInput!) {
    deleteContract(input: $input) {
      id
      bodytext {
        items {
          id
        }
      }
      comments {
        items {
          id
        }
      }
    }
  }
`;

export const GetContractDocument = gql`
  query GetContract($id: ID!) {
    getContract(id: $id) {
      id
      name
      description
      rawtext
      pages
      url
      date
      arn
      alerts {
        items {
          id
          content
          state
        }
        nextToken
      }
      actions {
        items {
          id
          content
          state
        }
        nextToken
      }
      Stats {
        alerts
        actions
        version
      }
      state
      bodytext(limit: 120) {
        items {
          id
          title
          rawtext
          seqnr
          state
          priority
          intents {
            items {
              id
              score
              text
              humanorai
            }
            nextToken
          }
          entities {
            items {
              id
              score
              type
              text
              beginOffset
              endOffset
              humanorai
            }
            nextToken
          }
          keyphrases {
            items {
              id
              score
              text
              beginOffset
              endOffset
              humanorai
            }
            nextToken
          }
          Stats {
            alerts
            actions
            version
          }
          alert {
            items {
              id
              content
              state
            }
            nextToken
          }
          action {
            items {
              id
              content
              state
            }
            nextToken
          }
          comments {
            items {
              id
              content
              state
            }
            nextToken
          }
        }
        nextToken
      }
      comments {
        items {
          id
          content
          state
        }
        nextToken
      }
    }
  }
`;

export const GetUser = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      contractaemail
      isTermsAndPrivacyAgreed
      timeline {
        id
      }
      ownedmetacontracts {
        items {
          id
          name
          description
          contracts {
            items {
              id
              name
            }
          }
        }
      }
      files {
        items {
          id
          filename
          folder
          source
          filestate
        }
      }
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      firstname
      lastname
      useremail
      s3folder
      contractaemail
      isTermsAndPrivacyAgreed
    }
  }
`;

export const BodyListDocument = gql`
  query bodyList {
    listBodys(limit: 120) {
      items {
        id
        title
        seqnr
        rawtext
        Stats {
          alerts
          actions
          version
        }
        alert {
          nextToken
        }
        action {
          nextToken
        }
        comments {
          nextToken
        }
        contract {
          id
          name
          description
          rawtext
          pages
          url
          date
          arn
          state
        }
        intents {
          nextToken
        }
        entities {
          nextToken
        }
        keyphrases {
          nextToken
        }
      }
      nextToken
    }
  }
`;

export const ContListDocument = gql`
  query listContracts {
    listContracts {
      items {
        id
        name
        description
        rawtext
        Stats {
          alerts
          actions
          version
        }
      }
    }
  }
`;

export const MetaContractList = gql`
  query listMeta {
    listMetaContracts {
      items {
        id
        name
        description
        contracts {
          items {
            id
            name
          }
        }
      }
    }
  }
`;

export const UpdateTC = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      firstname
      lastname
      useremail
      s3folder
      contractaemail
      isTermsAndPrivacyAgreed
    }
  }
`;

export const CreateFile = gql`
  mutation CreateFile($input: CreateFileInput!) {
    createFile(input: $input) {
      id
      filename
      folder
      source
      friendlyname
      access
      filestate
      fileowner {
        id
      }
    }
  }
`;

export const ListFiles = gql`
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        filename
        folder
        source
        friendlyname
        access
        filestate
        fileowner {
          id
        }
      }
    }
  }
`;

export const CreateMetaContract = gql`
  mutation CreateMetaContract($input: CreateMetaContractInput!) {
    createMetaContract(input: $input) {
      id
      name
      description
      url
      date
      lang
      arn
      state
      access
      docbot
      userowner {
        id
      }
    }
  }
`;

export const CreateFeedback = gql`
  mutation CreateFeedback($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
      like
      notlike
      add
      userowner {
        id
      }
    }
  }
`;

export const ListFactSets = gql`
  query getCo($id: ID!) {
    getContract(id: $id) {
      id
      name
      description
      factset {
        id
        factsetname
        fact {
          items {
            id
            factname
            factfriendlyvalue
            factjson
          }
        }
      }
    }
  }
`;

export const CreateFactObj = gql`
  mutation CreateFactObj($input: CreateFactObjInput!) {
    createFactObj(input: $input) {
      id
      factname
      derivedfrom
      factfriendlyvalue
      factjson
      isEnabled
      fs {
        id
      }
    }
  }
`;

export const CreateFactSet = gql`
  mutation CreateFactSet($input: CreateFactSetInput!) {
    createFactSet(input: $input) {
      id
      factsetname
      factsetdomain
      factsetdoctype
      factsettemplatecode
      contract {
        id
      }
    }
  }
`;

export const GetTimelineEvents = gql`
  query getTimelineEvents($id: ID!) {
    getTimeline(id: $id) {
      timelineName
      event {
        items {
          id
          name
          start
          end
          description
          isPayment
          isDeadline
          amount
          currency
        }
      }
    }
  }
`;

export const DeleteFactObj = gql`
  mutation DeleteFactObj($input: DeleteFactObjInput!) {
    deleteFactObj(input: $input) {
      id
    }
  }
`;
