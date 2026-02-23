#!/usr/bin/env bash

# Exit immediately if any command fails
set -e

# Function to handle errors
handle_error() {
    echo "❌ Build failed at line $1"
    echo "Command that failed: $2"
    exit 1
}


# Set error trap
trap 'handle_error $LINENO "$BASH_COMMAND"' ERR

if [ $# -lt 1 ]; then
    echo "Usage: $0 dev or prod or staging ..."
    exit 1
fi

ENV=$1
if [ $ENV != "dev" ] && [ $ENV != "prod" ] && [ $ENV != "staging" ]; then
    echo "only dev or prod or staging"
    exit 1
fi

echo "build process"
echo "--------------------------"


reenable_nextjs_telemetry() {
    echo "📊 Re-enabling Next.js telemetry..."
    if ! npx next telemetry enable; then
        echo "❌ Failed to re-enable telemetry"
        exit 1
    fi
}

restore_configuration() {
    echo "🧹 Cleaning up configuration..."
    if ! rm "src/environment/configuration.ts" 2>/dev/null; then
        echo "⚠️  Warning: Could not remove build configuration"
    fi

    if ! cp "src/environment/configuration.local.ts" "src/environment/configuration.ts"; then
        echo "❌ Failed to restore local configuration"
        exit 1
    fi
}

remove_next_directory() {
    echo "🧹 Removing .next directory..."
    if ! rm -rf .next 2>/dev/null; then
        echo "⚠️  Warning: Could not remove .next directory (may not exist)"
    fi
    echo "🧹 Removed .next directory successfully"
}

remove_web_directory() {
    echo "🧹 Removing web directory..."
    if ! rm -rf web 2>/dev/null; then
        echo "⚠️  Warning: Could not remove web directory (may not exist)"
    fi
    echo "🧹 Removed web directory successfully"
   
}
remove_web_directory
sleep 2
remove_next_directory
sleep 2

remove_demo_components() {
    if [ $ENV != "dev" ]; then
        if [ -d "src/app/(demo_components)" ]; then
            echo "🗑️  Removing demo_components for production build..."
            if ! rm -rf "src/app/(demo_components)" 2>/dev/null; then
                echo "❌ Failed to remove demo_components"
                exit 1
            fi
        fi
    fi
}

 

restore_demo_components() {
    if [ $ENV != "dev" ]; then
        echo "🔄 Restoring demo_components..."
        if ! git restore "src/app/(demo_components)" 2>/dev/null; then
            echo "⚠️  Warning: Could not restore demo_components (may not exist in git)"
        fi
    fi
}

restore() {
    remove_web_directory
    git restore web
    reenable_nextjs_telemetry
    restore_configuration
    restore_demo_components
    remove_next_directory
}

sleep 2

echo "📊 Disabling Next.js telemetry..."
if ! npx next telemetry disable; then
    echo "❌ Failed to disable telemetry"
    restore
    exit 1
fi

sleep 2

echo "🗑️  Removing old configuration..."
if ! rm "src/environment/configuration.ts" 2>/dev/null; then
    echo "⚠️  Warning: No old configuration to remove"
fi

if [ $ENV == "dev" ]; then
    echo "🏗️  Building for dev environment..."
    if ! cp "src/environment/configuration.dev.ts" "src/environment/configuration.ts"; then
        echo "❌ Failed to copy dev configuration"
        restore
        exit 1
    fi
    sleep 2
fi

# Remove demo_components for all environments
remove_demo_components

if [ $ENV == "prod" ]; then
    echo "🏗️  Building for production environment..."
    if ! cp "src/environment/configuration.prod.ts" "src/environment/configuration.ts"; then
        echo "❌ Failed to copy production configuration"
        restore
        exit 1
    fi
    sleep 2
fi


if [ $ENV == "staging" ]; then
    echo "🏗️  Building for staging environment..."
    if ! cp "src/environment/configuration.staging.ts" "src/environment/configuration.ts"; then
        echo "❌ Failed to copy staging configuration"
        restore
        exit 1
    fi
    sleep 2
fi

echo "🚀 Starting Next.js build..."
if ! npm run build; then
    echo "❌ Build failed"
    restore
    exit 1
fi

sleep 2


echo "📁 Creating web directory..."
if ! mkdir -p web; then
    echo "❌ Failed to create web directory"
    restore
    exit 1
fi

sleep 2

echo "📋 Copying build files..."
if ! cp -R ./.next/standalone/ ./web; then
    echo "❌ Failed to copy standalone build"
    restore
    exit 1
fi

if ! cp -R ./public ./web/; then
    echo "❌ Failed to copy public assets"
    restore
    exit 1
fi

if ! cp -R ./.next/static ./web/.next/; then
    echo "❌ Failed to copy static files"
    restore
    exit 1
fi

echo "🔧 Setting default server port to 3010..."
if sed 's/|| 3000/|| 3010/g' web/server.js > web/server.js.tmp; then
    mv web/server.js.tmp web/server.js
fi

restore_configuration
restore_demo_components

sleep 2

remove_next_directory

sleep 2

reenable_nextjs_telemetry

echo "--------------------------"
echo "✅ Build completed successfully!"
echo "📦 Your app is ready in the 'web' directory"